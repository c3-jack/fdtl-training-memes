var filename = 'test_Meme';
describe(filename, function () {
  beforeAll(function () {
    this.ctx = TestApi.createContext(filename);
    TestApi.createEntity(this.ctx, 'MemeAuthor', {
      id: 'seed_memeAuthor_testa',
      displayName: 'Test A',
      handle: '@testa',
    });
    TestApi.createEntity(this.ctx, 'MemeAuthor', {
      id: 'seed_memeAuthor_testb',
      displayName: 'Test B',
      handle: '@testb',
    });
    var postedAt = DateTime.fromString('2024-01-01T12:00:00Z');
    this.fixtures = {
      test_meme_a: 'testa',
      test_meme_b: 'testb',
      test_meme_a2: 'testa',
      test_meme_none: null,
    };
    var authors = this.fixtures;
    Object.keys(authors).forEach(function (id) {
      TestApi.createEntity(this.ctx, 'Meme', {
        id: id,
        caption: 'top / bottom',
        category: 'DeepFried',
        status: 'Published',
        postedAt: postedAt,
        author: authors[id] ? { id: 'seed_memeAuthor_' + authors[id] } : null,
      });
    }, this);
    TestApi.createEntity(this.ctx, 'Meme', {
      id: 'test_meme_draft_wholesome',
      caption: 'draft / only',
      category: 'Wholesome',
      status: 'Draft',
      postedAt: postedAt,
    });
    TestApi.createEntity(this.ctx, 'Meme', {
      id: 'test_meme_published_cursed',
      caption: 'published / cursed',
      category: 'Cursed',
      status: 'Published',
      postedAt: postedAt,
    });
    var searchFixtures = [
      { id: 'test_search_old', caption: 'ZqXjV old', status: 'Published', postedAt: '2024-01-01T10:00:00Z' },
      { id: 'test_search_new', caption: 'the zqxjv newest', status: 'Published', postedAt: '2024-01-03T10:00:00Z' },
      { id: 'test_search_mid', caption: 'ZQXJV middle', status: 'Published', postedAt: '2024-01-02T10:00:00Z' },
      { id: 'test_search_draft', caption: 'zqxjv draft', status: 'Draft', postedAt: '2024-01-04T10:00:00Z' },
      { id: 'test_search_other', caption: 'no match here', status: 'Published', postedAt: '2024-01-05T10:00:00Z' },
    ];
    searchFixtures.forEach(function (fixture) {
      TestApi.createEntity(this.ctx, 'Meme', {
        id: fixture.id,
        caption: fixture.caption,
        category: 'Wholesome',
        status: fixture.status,
        postedAt: DateTime.fromString(fixture.postedAt),
        author: { id: 'seed_memeAuthor_testa' },
      });
    }, this);
    this.memes = Meme.frontPageMemes();
    this.counts = Meme.publishedCountByCategory();
  });

  it('strips the seed_memeAuthor_ prefix from every returned author id', function () {
    this.memes.forEach(function (meme) {
      if (meme.author) {
        expect(meme.author.id.indexOf('seed_memeAuthor_')).toBe(-1);
      }
    });
  });

  it('returns the bare author name for each created meme', function () {
    var byId = {};
    this.memes.forEach(function (meme) {
      byId[meme.id] = meme;
    });
    var fixtures = this.fixtures;
    Object.keys(fixtures).forEach(function (id) {
      expect(byId[id]).toBeDefined();
      if (fixtures[id]) {
        expect(byId[id].author.id).toEqual(fixtures[id]);
      }
    });
  });

  it('leaves memes without an author unchanged', function () {
    var meme = this.memes.filter(function (m) {
      return m.id === 'test_meme_none';
    })[0];
    expect(meme.author).toBeFalsy();
  });

  it('only returns published DeepFried memes', function () {
    this.memes.forEach(function (meme) {
      expect(meme.status).toEqual('Published');
      expect(meme.category).toEqual('DeepFried');
    });
  });

  it('publishedCountByCategory returns {category, publishedCount} rows', function () {
    this.counts.forEach(function (row) {
      expect(typeof row.category).toEqual('string');
      expect(typeof row.publishedCount).toEqual('number');
    });
  });

  it('publishedCountByCategory matches the published count of every listed category', function () {
    this.counts.forEach(function (row) {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and().eq('category', row.category),
      });
      expect(row.publishedCount).toEqual(expected);
    });
  });

  it('publishedCountByCategory lists each category once, only with published memes', function () {
    var categories = this.counts.map(function (row) {
      return row.category;
    });
    expect(categories.length).toEqual(categories.filter(function (c, i) {
      return categories.indexOf(c) === i;
    }).length);
    expect(categories.indexOf('Cursed')).not.toBe(-1);
    expect(categories.indexOf('DeepFried')).not.toBe(-1);
    ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
      var published = Meme.fetchCount({ filter: Filter.eq('status', 'Published').and().eq('category', category) });
      expect(categories.indexOf(category) !== -1).toBe(published > 0);
    });
  });

  it('searchPublishedByCaption returns matching published memes newest first, ignoring case', function () {
    var ids = Meme.searchPublishedByCaption('zQxJv').map(function (meme) {
      return meme.id;
    });
    expect(ids).toEqual(['test_search_new', 'test_search_mid', 'test_search_old']);
  });

  it('searchPublishedByCaption excludes drafts', function () {
    Meme.searchPublishedByCaption('zqxjv').forEach(function (meme) {
      expect(meme.status).toEqual('Published');
    });
  });

  it('searchPublishedByCaption populates the author displayName', function () {
    Meme.searchPublishedByCaption('zqxjv').forEach(function (meme) {
      expect(meme.author.displayName).toEqual('Test A');
    });
  });

  it('searchPublishedByCaption returns nothing for a blank query', function () {
    expect(Meme.searchPublishedByCaption('')).toEqual([]);
    expect(Meme.searchPublishedByCaption('   ')).toEqual([]);
    expect(Meme.searchPublishedByCaption(null)).toEqual([]);
  });

  describe('as Curator', function () {
    var CURATOR = 'fdtlMemeMaker.Role.Curator';

    it('can call publishedCountByCategory', function () {
      var rows = TestRunner.asRole(
        CURATOR,
        Lambda.fromJsFunc(function () {
          return Meme.publishedCountByCategory();
        })
      );
      expect(rows.length).toBeGreaterThan(0);
    });

    it('can call searchPublishedByCaption with author displayName populated', function () {
      var memes = TestRunner.asRole(
        CURATOR,
        Lambda.fromJsFunc(function () {
          return Meme.searchPublishedByCaption('zqxjv');
        })
      );
      expect(
        memes.map(function (meme) {
          return meme.id;
        })
      ).toEqual(['test_search_new', 'test_search_mid', 'test_search_old']);
      memes.forEach(function (meme) {
        expect(meme.author.displayName).toEqual('Test A');
      });
    });
  });

  afterAll(function () {
    TestApi.teardown(this.ctx);
  });
});

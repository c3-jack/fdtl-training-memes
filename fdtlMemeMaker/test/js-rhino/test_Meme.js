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
    this.memes = Meme.frontPageMemes();
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

  afterAll(function () {
    TestApi.teardown(this.ctx);
  });
});

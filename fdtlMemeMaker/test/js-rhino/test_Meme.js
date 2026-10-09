var filename = 'test_Meme';
describe(filename, function () {
  describe('frontPageMemes', function () {
    beforeAll(function () {
      this.memes = Meme.frontPageMemes();
    });

    it('returns memes', function () {
      expect(this.memes.length).toBeGreaterThan(0);
    });

    it('returns every meme with its author displayName', function () {
      this.memes.each(function (meme) {
        expect(meme.author).toBeTruthy();
        expect(meme.author.displayName).toBeTruthy();
      });
    });
  });

  describe('publishedCountByCategory', function () {
    var CATEGORIES = ['Wholesome', 'Cursed', 'DeepFried'];

    beforeAll(function () {
      this.rows = Meme.publishedCountByCategory();
    });

    it('returns at least one category', function () {
      expect(this.rows.length).toBeGreaterThan(0);
    });

    it('matches an independent fetchCount for every category, absent when zero', function () {
      var rows = this.rows;
      CATEGORIES.forEach(function (category) {
        var expected = Meme.fetchCount({
          filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
        });
        var matching = rows.filter(function (row) {
          return row.category === category;
        });
        if (expected === 0) {
          expect(matching.length).toEqual(0);
        } else {
          expect(matching.length).toEqual(1);
          expect(matching[0].publishedCount).toEqual(expected);
        }
      });
    });
  });

  describe('searchPublishedByCaption', function () {
    var QUERY = 'test';

    beforeAll(function () {
      this.memes = Meme.searchPublishedByCaption(QUERY);
      this.expectedCount = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', QUERY)),
      });
    });

    it('has matches to check', function () {
      expect(this.expectedCount).toBeGreaterThan(0);
    });

    it('returns as many memes as an independent fetchCount', function () {
      expect(this.memes.length).toEqual(this.expectedCount);
    });

    it('returns only published memes whose caption contains the query', function () {
      this.memes.each(function (meme) {
        expect(meme.status).toEqual('Published');
        expect(meme.caption.toLowerCase()).toContain(QUERY);
      });
    });

    it('returns newest postedAt first', function () {
      for (var i = 1; i < this.memes.length; i++) {
        expect(String(this.memes[i - 1].postedAt) >= String(this.memes[i].postedAt)).toBe(true);
      }
    });

    it('returns every meme with its author displayName', function () {
      this.memes.each(function (meme) {
        expect(meme.author.displayName).toBeTruthy();
      });
    });

    it('returns nothing for a blank query', function () {
      expect(Meme.searchPublishedByCaption('   ').length).toEqual(0);
    });
  });
});

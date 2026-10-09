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
});

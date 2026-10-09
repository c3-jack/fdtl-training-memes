describe('test_Meme', function () {
  describe('W2-1 frontPageMemes', function () {
    it('returns memes whose author has a displayName', function () {
      var memes = Meme.frontPageMemes();
      expect(memes.length).toBeGreaterThan(0);
      memes.forEach(function (m) {
        expect(m.author).toBeTruthy();
        expect(m.author.displayName).toBeTruthy();
      });
    });
  });

  describe('W2-2 publishedCountByCategory', function () {
    var categories = ['Wholesome', 'Cursed', 'DeepFried'];

    it('matches an independent fetchCount for every category', function () {
      var rows = Meme.publishedCountByCategory();
      expect(rows.length).toBeGreaterThan(0);

      categories.forEach(function (category) {
        var expected = Meme.fetchCount({
          filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
        });
        var row = rows.filter(function (r) {
          return r.category === category;
        })[0];

        if (expected > 0) {
          expect(row).toBeDefined();
          expect(row.publishedCount).toEqual(expected);
        } else {
          expect(row).toBeUndefined();
        }
      });
    });
  });
});

describe('test_Meme', function () {
  describe('W2-1 frontPageMemes', function () {
    it('returns memes whose authors all have a displayName', function () {
      var memes = Meme.frontPageMemes();

      expect(memes.length).toBeGreaterThan(0);

      memes.forEach(function (meme) {
        expect(meme.author.displayName).toBeTruthy();
      });
    });
  });

  describe('W2-2 publishedCountByCategory', function () {
    it('matches an independent fetchCount for every category', function () {
      var rows = Meme.publishedCountByCategory();

      expect(rows.length).toBeGreaterThan(0);

      ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
        var expected = Meme.fetchCount({
          filter: Filter.eq('status', 'Published').and().eq('category', category),
        });
        var matching = rows.filter(function (r) {
          return r.category === category;
        });

        if (expected > 0) {
          expect(matching.length).toEqual(1);
          expect(matching[0].publishedCount).toEqual(expected);
        } else {
          expect(matching.length).toEqual(0);
        }
      });
    });
  });
});

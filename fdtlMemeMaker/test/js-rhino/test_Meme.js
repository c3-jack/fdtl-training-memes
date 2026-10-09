describe('W2-1 frontPageMemes', function () {
  it('returns an author displayName for every meme', function () {
    var memes = Meme.frontPageMemes();
    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

describe('W2-2 publishedCountByCategory', function () {
  it('returns at least one row', function () {
    expect(Meme.publishedCountByCategory().length).toBeGreaterThan(0);
  });

  ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
    it('matches an independent fetchCount for ' + category, function () {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });
            var matches = Meme.publishedCountByCategory().filter(function (r) {
        return r.category === category;
      });

      if (expected > 0) {
        expect(matches.length).toBe(1);
        expect(matches[0].publishedCount).toBe(expected);
      } else {
        expect(matches.length).toBe(0);
      }
    });
  });
});
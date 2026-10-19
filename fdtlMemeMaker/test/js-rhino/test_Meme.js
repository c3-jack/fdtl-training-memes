describe('W2-1 frontPageMemes', function () {
  it('returns every meme with its author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author).toBeTruthy();
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

describe('W2-2 publishedCountByCategory', function () {
  it('matches an independent fetchCount for every category', function () {
    var rows = Meme.publishedCountByCategory();
    var byCategory = {};
    rows.forEach(function (row) {
      byCategory[row.category] = row.publishedCount;
    });

    expect(rows.length).toBeGreaterThan(0);
    ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });
      if (expected === 0) {
        expect(byCategory[category]).toBeUndefined();
      } else {
        expect(byCategory[category]).toBe(expected);
      }
    });
  });
});

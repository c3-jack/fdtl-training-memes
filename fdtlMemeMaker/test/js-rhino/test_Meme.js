describe('W2-1 frontPageMemes', function () {
  it('returns memes whose author has a displayName', function () {
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
    var categories = ['Wholesome', 'Cursed', 'DeepFried'];

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
        expect(row.publishedCount).toBe(expected);
      } else {
        expect(row).toBeUndefined();
      }
    });
  });
});

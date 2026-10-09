describe('W2-1 frontPageMemes', function () {
  it('returns every meme with its author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    for (var i = 0; i < memes.length; i++) {
      expect(memes[i].author).toBeDefined();
      expect(memes[i].author.displayName).toBeTruthy();
    }
  });
});

describe('W2-2 publishedCountByCategory', function () {
  var categories = ['Wholesome', 'Cursed', 'DeepFried'];

  it('matches an independent fetchCount for every category and omits empty ones', function () {
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

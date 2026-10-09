describe('W2-1 frontPageMemes', function () {
  it('returns every front-page meme with its author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author).toBeTruthy();
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

describe('W2-2 publishedCountByCategory', function () {
  it('returns one row per category with published memes, matching an independent fetchCount', function () {
    var rows = Meme.publishedCountByCategory();

    expect(rows.length).toBeGreaterThan(0);

    ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });
      var matching = rows.filter(function (row) {
        return row.category === category;
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

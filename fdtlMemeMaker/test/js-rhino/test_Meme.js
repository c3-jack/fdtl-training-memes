describe('W2-1 Meme.frontPageMemes', function () {
  it('returns memes, each with its author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    // Guard: an empty list would make the loop below pass without checking anything.
    expect(memes.length).toBeGreaterThan(0);

    for (var i = 0; i < memes.length; i++) {
      expect(memes[i].author).toBeDefined();
      expect(memes[i].author.displayName).toBeTruthy();
    }
  });
});

describe('W2-2 Meme.publishedCountByCategory', function () {
  it('returns a row only for categories with published memes, with counts matching fetchCount', function () {
    var rows = Meme.publishedCountByCategory();
    expect(rows.length).toBeGreaterThan(0);

    var categories = ['Wholesome', 'Cursed', 'DeepFried'];
    for (var c = 0; c < categories.length; c++) {
      var category = categories[c];
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });

      var row = null;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].category === category) {
          row = rows[i];
        }
      }

      if (expected === 0) {
        expect(row).toBeNull();
      } else {
        expect(row).not.toBeNull();
        expect(row.publishedCount).toEqual(expected);
      }
    }
  });
});
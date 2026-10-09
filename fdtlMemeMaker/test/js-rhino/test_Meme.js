describe('W2-1: frontPageMemes returns the author displayName', function () {
  it('populates author.displayName on every returned meme', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    for (var i = 0; i < memes.length; i++) {
      expect(memes[i].author).toBeTruthy();
      expect(memes[i].author.displayName).toBeTruthy();
    }
  });
});

describe('W2-2: publishedCountByCategory', function () {
  var categories = ['Wholesome', 'Cursed', 'DeepFried'];

  it('matches an independent fetchCount for every category', function () {
    var rows = Meme.publishedCountByCategory();

    expect(rows.length).toBeGreaterThan(0);

    categories.forEach(function (category) {
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
        expect(row.publishedCount).toBe(expected);
      }
    });
  });
});

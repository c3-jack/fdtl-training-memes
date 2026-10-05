describe('W2-1', function () {
  it('returns every author displayName and is not empty', function () {
    var memes = Meme.frontPageMemes();

    expect(memes).toBeDefined();
    expect(memes.length).toBeGreaterThan(0);

    for (var i = 0; i < memes.length; i++) {
      var displayName = memes[i].author && memes[i].author.displayName;
      expect(typeof displayName).toEqual('string');
      expect(displayName.length).toBeGreaterThan(0);
    }
  });
});

describe('W2-2', function () {
  it('matches an independent published count for every category', function () {
    var rows = Meme.publishedCountByCategory();
    expect(rows.length).toBeGreaterThan(0);

    var categories = ['Wholesome', 'Cursed', 'DeepFried'];
    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];
      var independent = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });
      var match = null;
      for (var j = 0; j < rows.length; j++) {
        if (rows[j].category === category) match = rows[j];
      }
      if (independent === 0) {
        expect(match).toBeNull();
      } else {
        expect(match).not.toBeNull();
        expect(Number(match.publishedCount)).toEqual(Number(independent));
      }
    }
  });
});

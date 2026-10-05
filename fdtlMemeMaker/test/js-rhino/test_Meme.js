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

describe('W2-3', function () {
  function postedAtMillis(value) {
    if (value == null) return 0;
    if (typeof value.millis === 'number') return value.millis;
    if (typeof value.millis === 'function') return value.millis();
    var parsed = Date.parse(String(value));
    return isNaN(parsed) ? 0 : parsed;
  }

  it('matches an independent published caption count and is not empty', function () {
    var query = 'test';
    var memes = Meme.searchPublishedByCaption(query);
    var independent = Meme.fetchCount({
      filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', query)),
    });

    expect(independent).toBeGreaterThan(0);
    expect(memes.length).toEqual(independent);

    for (var i = 0; i < memes.length; i++) {
      expect(memes[i].status).toEqual('Published');
      var displayName = memes[i].author && memes[i].author.displayName;
      expect(typeof displayName).toEqual('string');
      expect(displayName.length).toBeGreaterThan(0);
      if (i > 0) {
        expect(postedAtMillis(memes[i - 1].postedAt) >= postedAtMillis(memes[i].postedAt)).toEqual(true);
      }
    }
  });
});

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

describe('W2-3 searchPublishedByCaption', function () {
  it('returns exactly the published memes whose caption contains the query, any case, newest first', function () {
    var published = Filter.eq('status', 'Published');
    var expected = Meme.fetchCount({ filter: published.and(Filter.containsIgnoreCase('caption', 'test')) });
    var results = Meme.searchPublishedByCaption('test');

    expect(expected).toBeGreaterThan(0);
    expect(results.length).toEqual(expected);

    results.forEach(function (meme) {
      expect(meme.status).toEqual('Published');
      expect(meme.caption.toLowerCase()).toContain('test');
      expect(meme.author).toBeTruthy();
      expect(meme.author.displayName).toBeTruthy();
    });

    for (var i = 1; i < results.length; i++) {
      expect(String(results[i - 1].postedAt) >= String(results[i].postedAt)).toBe(true);
    }
  });

  it('matches regardless of the case of the query', function () {
    expect(Meme.searchPublishedByCaption('TEST').length).toEqual(Meme.searchPublishedByCaption('test').length);
  });

  it('returns nothing for a blank or empty query', function () {
    expect(Meme.searchPublishedByCaption('').length).toEqual(0);
    expect(Meme.searchPublishedByCaption('   ').length).toEqual(0);
  });
});

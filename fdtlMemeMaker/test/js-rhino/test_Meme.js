describe('W2-1 frontPageMemes', function () {
  it('returns every front-page meme with its author displayName', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);

    memes.forEach(function (meme) {
      expect(meme.author).toBeDefined();
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
        expect(matching.length).toBe(1);
        expect(matching[0].publishedCount).toBe(expected);
      } else {
        expect(matching.length).toBe(0);
      }
    });
  });
});

describe('W2-3 searchPublishedByCaption', function () {
  function publishedMatchCount(query) {
    return Meme.fetchCount({
      filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', query)),
    });
  }

  it('returns only published memes matching the caption, newest first, with author displayName', function () {
    var results = Meme.searchPublishedByCaption('test');
    var expected = publishedMatchCount('test');

    expect(expected).toBeGreaterThan(0);
    expect(results.length).toBe(expected);

    results.forEach(function (meme, i) {
      expect(meme.status).toBe('Published');
      expect(meme.caption.toLowerCase()).toContain('test');
      expect(meme.author.displayName).toBeTruthy();

      if (i > 0) {
        var previous = new Date(results[i - 1].postedAt).getTime();
        expect(previous).not.toBeLessThan(new Date(meme.postedAt).getTime());
      }
    });
  });

  it('matches the caption regardless of the query case', function () {
    var expected = publishedMatchCount('test');

    expect(Meme.searchPublishedByCaption('TEST').length).toBe(expected);
    expect(Meme.searchPublishedByCaption('TeSt').length).toBe(expected);
  });
});

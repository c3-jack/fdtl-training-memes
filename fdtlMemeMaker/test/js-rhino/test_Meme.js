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

describe('W2-3 searchPublishedByCaption', function () {
  it('returns published memes matching the query, newest first, with author displayName', function () {
    var query = 'test';
    var memes = Meme.searchPublishedByCaption(query);
    var expected = Meme.fetchCount({
      filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', query)),
    });

    expect(expected).toBeGreaterThan(0);
    expect(memes.length).toBe(expected);
    memes.forEach(function (meme, i) {
      expect(meme.status).toBe('Published');
      expect(meme.caption.toLowerCase()).toContain(query);
      expect(meme.author.displayName).toBeTruthy();
      if (i > 0) {
        expect(new Date(memes[i - 1].postedAt).getTime()).not.toBeLessThan(new Date(meme.postedAt).getTime());
      }
    });
  });

  it('returns nothing for a blank query', function () {
    expect(Meme.searchPublishedByCaption('').length).toBe(0);
    expect(Meme.searchPublishedByCaption('   ').length).toBe(0);
  });
});

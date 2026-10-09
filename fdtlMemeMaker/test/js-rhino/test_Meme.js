describe('W2-1 frontPageMemes', function () {
  it('returns memes with the author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author).toBeTruthy();
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

describe('W2-2 publishedCountByCategory', function () {
  it('returns one row per category with published memes, matching fetchCount', function () {
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
  it('returns published memes whose caption contains the query, newest first', function () {
    var memes = Meme.searchPublishedByCaption('TeSt');
    var expected = Meme.fetchCount({
      filter: Filter.eq('status', 'Published').and().containsIgnoreCase('caption', 'test'),
    });

    expect(expected).toBeGreaterThan(0);
    expect(memes.length).toEqual(expected);
    memes.forEach(function (meme, i) {
      expect(meme.status).toEqual('Published');
      expect(meme.caption.toLowerCase()).toContain('test');
      expect(meme.author.displayName).toBeTruthy();
      if (i > 0) {
        expect(memes[i - 1].postedAt.toString() >= meme.postedAt.toString()).toBe(true);
      }
    });
  });

  it('returns no memes for a blank query', function () {
    expect(Meme.searchPublishedByCaption('').length).toEqual(0);
    expect(Meme.searchPublishedByCaption('   ').length).toEqual(0);
  });
});

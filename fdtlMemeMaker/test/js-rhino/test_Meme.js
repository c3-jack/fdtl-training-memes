describe('W2-1 frontPageMemes', function () {
  it('returns an author displayName for every meme', function () {
    var memes = Meme.frontPageMemes();
    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

describe('W2-2 publishedCountByCategory', function () {
  it('returns at least one row', function () {
    expect(Meme.publishedCountByCategory().length).toBeGreaterThan(0);
  });

  ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
    it('matches an independent fetchCount for ' + category, function () {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });
            var matches = Meme.publishedCountByCategory().filter(function (r) {
        return r.category === category;
      });

      if (expected > 0) {
        expect(matches.length).toBe(1);
        expect(matches[0].publishedCount).toBe(expected);
      } else {
        expect(matches.length).toBe(0);
      }
    });
  });
});

describe('W2-3 searchPublishedByCaption', function () {
  it('matches an independent fetchCount, is published only, and is newest first', function () {
    var expected = Meme.fetchCount({
      filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', 'test')),
    });
    var memes = Meme.searchPublishedByCaption('test');

    expect(expected).toBeGreaterThan(0);
    expect(memes.length).toBe(expected);
    memes.forEach(function (meme) {
      expect(meme.status).toBe('Published');
      expect(meme.author.displayName).toBeTruthy();
    });
    for (var i = 1; i < memes.length; i++) {
      expect(String(memes[i - 1].postedAt) >= String(memes[i].postedAt)).toBe(true);
    }
  });

  it('matches regardless of case', function () {
    expect(Meme.searchPublishedByCaption('TEST').length).toBe(Meme.searchPublishedByCaption('test').length);
  });

  it('returns nothing for a blank query', function () {
    expect(Meme.searchPublishedByCaption('').length).toBe(0);
  });
});
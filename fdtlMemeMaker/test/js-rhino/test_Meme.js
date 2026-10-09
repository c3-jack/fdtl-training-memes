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

describe('W2-3: searchPublishedByCaption', function () {
  var query = 'test';
  var filter = Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', query));

  it('returns exactly the published memes matching the caption, newest first, with author displayName', function () {
    var expectedCount = Meme.fetchCount({ filter: filter });
    var expectedIds = Meme.fetch({ filter: filter, order: 'descending(postedAt)' }).objs.map(function (m) {
      return m.id;
    });
    var results = Meme.searchPublishedByCaption(query);

    expect(expectedCount).toBeGreaterThan(0);
    expect(results.length).toBe(expectedCount);
    for (var i = 0; i < results.length; i++) {
      expect(results[i].status).toBe('Published');
      expect(results[i].caption.toLowerCase()).toContain(query);
      expect(results[i].author.displayName).toBeTruthy();
      expect(results[i].id).toBe(expectedIds[i]);
    }
  });
});

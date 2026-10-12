describe('Meme.frontPageMemes', function () {
  it("returns every meme with its author's displayName", function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      var author = MemeAuthor.forId(meme.author.id).get('displayName');
      expect(meme.author.displayName).toBe(author.displayName);
    });
  });
});

describe('Meme.publishedCountByCategory', function () {
  it('matches an independent fetchCount for every category', function () {
    var rows = Meme.publishedCountByCategory();

    expect(rows.length).toBeGreaterThan(0);
    ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
      });
      var matching = rows.filter(function (row) {
        return row.category === category;
      });

      if (expected === 0) {
        expect(matching.length).toBe(0);
      } else {
        expect(matching.length).toBe(1);
        expect(matching[0].publishedCount).toBe(expected);
      }
    });
  });
});

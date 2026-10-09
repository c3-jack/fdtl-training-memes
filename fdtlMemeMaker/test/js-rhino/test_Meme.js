describe('test_Meme', function () {
  describe('W2-1 frontPageMemes', function () {
    it('returns memes whose author has a displayName', function () {
      var memes = Meme.frontPageMemes();
      expect(memes.length).toBeGreaterThan(0);
      memes.forEach(function (m) {
        expect(m.author).toBeTruthy();
        expect(m.author.displayName).toBeTruthy();
      });
    });
  });

  describe('W2-2 publishedCountByCategory', function () {
    var categories = ['Wholesome', 'Cursed', 'DeepFried'];

    it('matches an independent fetchCount for every category', function () {
      var rows = Meme.publishedCountByCategory();
      expect(rows.length).toBeGreaterThan(0);

      categories.forEach(function (category) {
        var expected = Meme.fetchCount({
          filter: Filter.eq('status', 'Published').and(Filter.eq('category', category)),
        });
        var matches = rows.filter(function (r) {
          return r.category === category;
        });

        if (expected > 0) {
          expect(matches.length).toEqual(1);
          expect(matches[0].publishedCount).toEqual(expected);
        } else {
          expect(matches.length).toEqual(0);
        }
      });
    });
  });

  describe('W2-3 searchPublishedByCaption', function () {
    it('returns every published match, newest first, with author displayName', function () {
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', 'test')),
      });
      expect(expected).toBeGreaterThan(0);

      var memes = Meme.searchPublishedByCaption('test');
      expect(memes.length).toEqual(expected);

      memes.forEach(function (m, i) {
        expect(m.status).toEqual('Published');
        expect(m.caption.toLowerCase()).toContain('test');
        expect(m.author.displayName).toBeTruthy();
        if (i > 0) {
          expect(memes[i - 1].postedAt.getTime()).not.toBeLessThan(m.postedAt.getTime());
        }
      });
    });

    it('matches regardless of case', function () {
      expect(Meme.searchPublishedByCaption('TEST').length).toEqual(Meme.searchPublishedByCaption('test').length);
    });

    it('returns nothing for a blank query', function () {
      expect(Meme.searchPublishedByCaption('').length).toEqual(0);
      expect(Meme.searchPublishedByCaption('   ').length).toEqual(0);
    });
  });
});

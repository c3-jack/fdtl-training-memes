describe('test_Meme', function () {
  describe('W2-1 frontPageMemes', function () {
    it('returns memes whose authors all have a displayName', function () {
      var memes = Meme.frontPageMemes();

      expect(memes.length).toBeGreaterThan(0);

      memes.forEach(function (meme) {
        expect(meme.author.displayName).toBeTruthy();
      });
    });
  });

  describe('W2-2 publishedCountByCategory', function () {
    it('matches an independent fetchCount for every category', function () {
      var rows = Meme.publishedCountByCategory();

      expect(rows.length).toBeGreaterThan(0);

      ['Wholesome', 'Cursed', 'DeepFried'].forEach(function (category) {
        var expected = Meme.fetchCount({
          filter: Filter.eq('status', 'Published').and().eq('category', category),
        });
        var matching = rows.filter(function (r) {
          return r.category === category;
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
    it('returns every published match, newest first, with author displayName', function () {
      var memes = Meme.searchPublishedByCaption('test');
      var expected = Meme.fetchCount({
        filter: Filter.eq('status', 'Published').and(Filter.containsIgnoreCase('caption', 'test')),
      });

      expect(expected).toBeGreaterThan(0);
      expect(memes.length).toEqual(expected);

      memes.forEach(function (meme, i) {
        expect(meme.status).toEqual('Published');
        expect(meme.caption.toLowerCase()).toContain('test');
        expect(meme.author.displayName).toBeTruthy();
        if (i > 0) {
          expect(String(memes[i - 1].postedAt) >= String(meme.postedAt)).toBe(true);
        }
      });
    });

    it('returns an empty list for a blank query', function () {
      expect(Meme.searchPublishedByCaption('').length).toEqual(0);
      expect(Meme.searchPublishedByCaption('   ').length).toEqual(0);
    });
  });
});

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
});

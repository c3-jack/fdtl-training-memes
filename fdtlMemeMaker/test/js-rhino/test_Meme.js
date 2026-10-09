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
});

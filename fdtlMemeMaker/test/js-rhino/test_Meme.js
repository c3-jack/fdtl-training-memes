var filename = 'test_Meme';
describe(filename, function () {
  describe('frontPageMemes', function () {
    beforeAll(function () {
      this.memes = Meme.frontPageMemes();
    });

    it('returns memes', function () {
      expect(this.memes.length).toBeGreaterThan(0);
    });

    it('returns every meme with its author displayName', function () {
      this.memes.each(function (meme) {
        expect(meme.author).toBeTruthy();
        expect(meme.author.displayName).toBeTruthy();
      });
    });
  });
});

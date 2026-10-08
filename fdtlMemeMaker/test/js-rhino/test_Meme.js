describe('W2-1 frontPageMemes', function () {
  it('returns an author displayName for every meme', function () {
    var memes = Meme.frontPageMemes();
    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});
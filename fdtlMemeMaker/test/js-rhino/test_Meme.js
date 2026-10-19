describe('W2-1 frontPageMemes', function () {
  it('returns every meme with its author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      expect(meme.author).toBeTruthy();
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

describe('W2-1 frontPageMemes', function () {
  it('returns every front-page meme with its author displayName', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);

    memes.forEach(function (meme) {
      expect(meme.author).toBeDefined();
      expect(meme.author.displayName).toBeTruthy();
    });
  });
});

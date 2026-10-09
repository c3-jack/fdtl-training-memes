describe('W2-1 Meme.frontPageMemes', function () {
  it('returns memes, each with its author displayName populated', function () {
    var memes = Meme.frontPageMemes();

    // Guard: an empty list would make the loop below pass without checking anything.
    expect(memes.length).toBeGreaterThan(0);

    for (var i = 0; i < memes.length; i++) {
      expect(memes[i].author).toBeDefined();
      expect(memes[i].author.displayName).toBeTruthy();
    }
  });
});
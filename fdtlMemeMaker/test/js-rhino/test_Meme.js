describe('W2-1: frontPageMemes returns the author displayName', function () {
  it('populates author.displayName on every returned meme', function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    for (var i = 0; i < memes.length; i++) {
      expect(memes[i].author).toBeTruthy();
      expect(memes[i].author.displayName).toBeTruthy();
    }
  });
});

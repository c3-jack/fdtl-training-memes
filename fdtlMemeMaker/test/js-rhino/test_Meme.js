describe('W2-1', function () {
  it('returns every author displayName and is not empty', function () {
    var memes = Meme.frontPageMemes();

    expect(memes).toBeDefined();
    expect(memes.length).toBeGreaterThan(0);

    for (var i = 0; i < memes.length; i++) {
      var displayName = memes[i].author && memes[i].author.displayName;
      expect(typeof displayName).toEqual('string');
      expect(displayName.length).toBeGreaterThan(0);
    }
  });
});

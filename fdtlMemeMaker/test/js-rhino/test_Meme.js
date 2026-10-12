describe('Meme.frontPageMemes', function () {
  it("returns every meme with its author's displayName", function () {
    var memes = Meme.frontPageMemes();

    expect(memes.length).toBeGreaterThan(0);
    memes.forEach(function (meme) {
      var author = MemeAuthor.forId(meme.author.id).get('displayName');
      expect(meme.author.displayName).toBe(author.displayName);
    });
  });
});

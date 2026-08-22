function frontPageMemes() {
  var logger = C3.logger('Meme');

  var result = Meme.fetch({
    filter: Filter.eq('status', 'Published').and(Filter.eq('category', 'DeepFried')),
  });

  logger.info('frontPageMemes returned ' + result.objs.length + ' memes');
  return result.objs;
}

function exportJson() {
  var full = Meme.forId(this.id).get('this, author.this, template.this');

  return {
    caption: full.caption,
    category: full.category,
    status: full.status,
    postedAt: full.postedAt,
    author: full.author ? { displayName: full.author.displayName, handle: full.author.handle } : null,
    template: full.template
      ? { name: full.template.name, imageUrl: full.template.imageUrl, width: full.template.width, height: full.template.height }
      : null,
    customImageUrl: full.customImageUrl,
  };
}

function importJson(data) {
  var author = null;
  if (data.author && data.author.handle) {
    author = MemeAuthor.fetch({ filter: Filter.eq('handle', data.author.handle) }).objs[0];
    if (!author) {
      author = MemeAuthor.make({ displayName: data.author.displayName, handle: data.author.handle }).create();
    }
  }

  var template = null;
  if (data.template && data.template.name) {
    template = MemeTemplate.fetch({ filter: Filter.eq('name', data.template.name) }).objs[0];
    if (!template) {
      template = MemeTemplate.make({
        name: data.template.name,
        imageUrl: data.template.imageUrl,
        width: data.template.width,
        height: data.template.height,
      }).create();
    }
  }

  return Meme.make({
    caption: data.caption,
    category: data.category,
    status: data.status,
    postedAt: data.postedAt,
    author: author,
    template: template,
    customImageUrl: data.customImageUrl,
  }).create();
}

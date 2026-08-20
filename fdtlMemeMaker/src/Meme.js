function frontPageMemes() {
  var logger = C3.logger('Meme');

  var result = Meme.fetch({
    filter: Filter.eq('status', 'Published').and(Filter.eq('category', 'DeepFried')),
  });

  logger.info('frontPageMemes returned ' + result.objs.length + ' memes');
  return result.objs;
}

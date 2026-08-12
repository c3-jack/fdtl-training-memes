function openHighPriorityTickets() {
  var logger = C3.logger('HelpTicket');

  var result = HelpTicket.fetch({
    filter: Filter.eq('status', 'Open').and(Filter.eq('priority', 'High')),
  });

  logger.info('openHighPriorityTickets returned ' + result.objs.length + ' tickets');
  return result.objs;
}

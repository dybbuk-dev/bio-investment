export default (app) => {
  app.post(`/token`, require('./tokenCreate').default);
  app.put(`/token/:id`, require('./tokenUpdate').default);
  app.post(
    `/token/import`,
    require('./tokenImport').default,
  );
  app.delete(`/token`, require('./tokenDestroy').default);
  app.get(
    `/token/autocomplete`,
    require('./tokenAutocomplete').default,
  );
  app.get(`/token`, require('./tokenList').default);
  app.get(`/token/:id`, require('./tokenFind').default);
};

export default (app) => {
  app.post(
    `/property`,
    require('./propertyCreate').default,
  );
  app.put(
    `/property/:id`,
    require('./propertyUpdate').default,
  );
  app.post(
    `/property/import`,
    require('./propertyImport').default,
  );
  app.delete(
    `/property`,
    require('./propertyDestroy').default,
  );
  app.get(
    `/property/autocomplete`,
    require('./propertyAutocomplete').default,
  );
  app.get(`/property`, require('./propertyList').default);
  app.get(
    `/property/:id`,
    require('./propertyFind').default,
  );
};

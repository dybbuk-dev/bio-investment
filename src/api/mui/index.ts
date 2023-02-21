export default (app) => {
  app.put(`/mui`, require('./muiSave').default);
  app.get(`/mui`, require('./muiFind').default);
};

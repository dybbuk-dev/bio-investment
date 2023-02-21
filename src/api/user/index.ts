export default (app) => {
  app.post(`/userInvite`, require('./userInvite').default);
  app.put(`/user`, require('./userEdit').default);
  app.post(`/user/import`, require('./userImport').default);
  app.delete(`/user`, require('./userDestroy').default);
  app.get(`/admin`, require('./adminList').default);
  app.get(`/customer`, require('./customerList').default);
  app.get(
    `/user/autocomplete`,
    require('./userAutocomplete').default,
  );
  app.get(`/user/:id`, require('./userFind').default);
  app.put('/user/accept', require('./userAccept').default);
  app.put('/user/reject', require('./userReject').default);
};

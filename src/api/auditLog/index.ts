export default (app) => {
  app.get(`/audit-log`, require('./auditLogList').default);
};

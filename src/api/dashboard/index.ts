export default (app) => {
  app.get(
    `/statistics/countTotalCustomer`,
    require('./countTotalCustomer').default,
  );
  app.get(
    `/statistics/countVerifiedCustomer`,
    require('./countVerifiedCustomer').default,
  );
  app.get(
    `/statistics/countCountry`,
    require('./countCountry').default,
  );
  app.get(
    `/statistics/countRequestedCustomer`,
    require('./countRequestedCustomer').default,
  );
};

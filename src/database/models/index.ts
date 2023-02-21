const models = [
  require('./mui').default,
  require('./auditLog').default,
  require('./token').default,
  require('./file').default,
  require('./user').default,
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}

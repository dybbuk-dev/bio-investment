import { getConfig } from '../../config';
import Error400 from '../../errors/Error400';
import { IRepositoryOptions } from './IRepositoryOptions';
import mongoose from 'mongoose';

/**
 * Abstracts some basic Mongoose operations.
 * See https://mongoosejs.com/docs/index.html
 */
export default class MongooseRepository {
  /**
   * Cleans the database.
   */
  static async cleanDatabase(connection) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(
        'Clean database only allowed for test!',
      );
    }

    return connection.dropDatabase();
  }

  /**
   * Returns the currentUser if it exists on the options.
   */
  static getCurrentUser(options: IRepositoryOptions) {
    return (options && options.currentUser) || { id: null };
  }

  /**
   * Returns the session if it exists on the options.
   */
  static getSession(options: IRepositoryOptions) {
    return (options && options.session) || undefined;
  }

  /**
   * Creates a database session and transaction.
   */
  static async createSession(connection) {
    if (getConfig().DATABASE_TRANSACTIONS !== 'true') {
      return;
    }

    const session = await connection.startSession();
    await session.startTransaction();
    return session;
  }

  /**
   * Commits a database transaction.
   */
  static async commitTransaction(session) {
    if (getConfig().DATABASE_TRANSACTIONS !== 'true') {
      return;
    }

    await session.commitTransaction();
    await session.endSession();
  }

  /**
   * Aborts a database transaction.
   */
  static async abortTransaction(session) {
    if (getConfig().DATABASE_TRANSACTIONS !== 'true') {
      return;
    }

    await session.abortTransaction();
    await session.endSession();
  }

  /**
   * Wraps the operation with the current session.
   */
  static async wrapWithSessionIfExists(
    toWrap,
    options: IRepositoryOptions,
  ) {
    if (!this.getSession(options)) {
      return toWrap;
    }

    return toWrap.session(this.getSession(options));
  }

  /**
   * In the case of a two way relationship, both records from both collections
   * must be in sync.
   * This method ensures it for Many to One relations.
   */
  static async refreshTwoWayRelationManyToOne(
    record,
    sourceModel,
    sourceToken,
    targetModel,
    targetToken,
    options: IRepositoryOptions,
  ) {
    await sourceModel.updateMany(
      {
        _id: { $nin: record._id },
        [sourceToken]: { $in: record[sourceToken] },
      },
      {
        $pullAll: {
          [sourceToken]: record[sourceToken],
        },
      },
      options,
    );

    await targetModel.updateMany(
      {
        _id: { $in: record[sourceToken] },
      },
      { [targetToken]: record._id },
      options,
    );

    await targetModel.updateMany(
      {
        _id: { $nin: record[sourceToken] },
        [targetToken]: record._id,
      },
      { [targetToken]: null },
      options,
    );
  }

  /**
   * In the case of a two-way relationship, both records from
   * both collections must be in sync.
   * This method ensures it for One to One relations.
   */
  static async refreshTwoWayRelationOneToMany(
    record,
    sourceToken,
    targetModel,
    targetToken,
    options: IRepositoryOptions,
  ) {
    await targetModel.updateOne(
      { _id: record[sourceToken] },
      { $addToSet: { [targetToken]: record._id } },
      options,
    );

    await targetModel.updateMany(
      {
        _id: { $ne: record[sourceToken] },
        [targetToken]: record._id,
      },
      { $pull: { [targetToken]: record._id } },
      options,
    );
  }

  /**
   * In the case of a two-way relationship, both records from
   * both collections must be in sync.
   * This method ensures it for Many to Many relations.
   */
  static async refreshTwoWayRelationManyToMany(
    record,
    sourceToken,
    targetModel,
    targetToken,
    options: IRepositoryOptions,
  ) {
    await targetModel.updateMany(
      { _id: { $in: record[sourceToken] } },
      { $addToSet: { [targetToken]: record._id } },
      options,
    );

    await targetModel.updateMany(
      {
        _id: { $nin: record[sourceToken] },
        [targetToken]: { $in: record._id },
      },
      { $pull: { [targetToken]: record._id } },
      options,
    );
  }

  /**
   * If the record is referenced on other collection,
   * clears the referece from the other collection.
   * This method handles the relatino to many.
   */
  static async destroyRelationToMany(
    recordId,
    targetModel,
    targetToken,
    options: IRepositoryOptions,
  ) {
    await targetModel.updateMany(
      { [targetToken]: recordId },
      { $pull: { [targetToken]: recordId } },
      options,
    );
  }

  /**
   * If the record is referenced on other collection,
   * clears the referece from the other collection.
   * This method handles the relatino to one.
   */
  static async destroyRelationToOne(
    recordId,
    targetModel,
    targetToken,
    options: IRepositoryOptions,
  ) {
    await targetModel.updateMany(
      { [targetToken]: recordId },
      { [targetToken]: null },
      options,
    );
  }

  static handleUniqueFieldError(
    error,
    language,
    entityName,
  ) {
    if (!error || error.code !== 11000) {
      return;
    }

    const uniqueFieldWithError = Object.keys(
      error.keyPattern,
    )[0];

    throw new Error400(
      language,
      `entities.${entityName}.errors.unique.${uniqueFieldWithError}`,
    );
  }
}

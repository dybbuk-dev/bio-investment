import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Token from '../models/token';
import UserRepository from './userRepository';
import moment from 'moment';

class TokenRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        Token(options.database).find({}),
        options,
      );

    let tokenNumber = 1;

    if (rows.length !== 0) {
      tokenNumber = rows[rows.length - 1].tokenNumber + 1;
    }

    const [record] = await Token(options.database).create(
      [
        {
          ...data,
          tokenNumber,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Token(options.database).findOne({
          _id: id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Token(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Token(options.database).findOne({
          _id: id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Token(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
  }

  static async filterId(id, options: IRepositoryOptions) {
    return lodash.get(
      await this.filterIds([id], options),
      '[0]',
      null,
    );
  }

  static async filterIds(ids, options: IRepositoryOptions) {
    if (!ids || !ids.length) {
      return [];
    }

    const records = await Token(options.database)
      .find({
        _id: { $in: ids },
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      Token(options.database).countDocuments({
        ...filter,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Token(options.database)
          .findOne({ _id: id })
          .populate('photographs'),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(
      record,
      options,
      false,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    let criteriaAnd: any = [];

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.tokenNumber) {
        criteriaAnd.push({
          ['tokenNumber']: {
            $eq: filter.tokenNumber,
          },
        });
      }

      if (filter.country) {
        criteriaAnd.push({
          ['country']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.country,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.city) {
        criteriaAnd.push({
          ['city']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.city,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.tokenType) {
        criteriaAnd.push({
          ['tokenType']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.tokenType,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.tokenName) {
        criteriaAnd.push({
          ['tokenName']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.tokenName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.name) {
        criteriaAnd.push({
          ['name']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.initialRentDate) {
        if (
          filter.initialRentDate !== undefined &&
          filter.initialRentDate !== null &&
          filter.initialRentDate !== ''
        ) {
          const start = moment(filter.initialRentDate).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          });
          const end = moment(start).add(1, 'days');

          criteriaAnd.push({
            $and: [
              {
                ['initialRentDate']: {
                  $gte: start,
                },
              },
              {
                ['initialRentDate']: {
                  $lt: end,
                },
              },
            ],
          });
        }
      }

      if (filter.status) {
        criteriaAnd.push({
          ['status']: {
            $eq: filter.status,
          },
        });
      }

      if (filter.tokenAddress) {
        criteriaAnd.push({
          ['tokenAddress']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.tokenAddress,
            ),
          },
        });
      }

      if (filter.investorsNumberRange) {
        const [start, end] = filter.investorsNumberRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['investorsNumber']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['investorsNumber']: {
              $lte: end,
            },
          });
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        Token(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('photographs'),
        options,
      );

    const count =
      await MongooseRepository.wrapWithSessionIfExists(
        Token(options.database).countDocuments(criteria),
        options,
      );

    rows = await Promise.all(
      rows.map(async (row) =>
        this._mapRelationshipsAndFillDownloadUrl(
          row,
          options,
          false,
        ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    let criteriaAnd: Array<any> = [];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            name: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    const records = await Token(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .select(['_id', 'name']);

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Token(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    if (metaOnly) {
      return output;
    }

    output.photographs =
      await FileRepository.cleanupForRelationships(
        output.photographs,
        options,
      );

    return output;
  }
}

export default TokenRepository;

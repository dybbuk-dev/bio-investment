import { getUserNameOrEmailPrefix } from '../../utils/userUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import crypto from 'crypto';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import MuiRepository from './muiRepository';
import User from '../models/user';
import moment from 'moment';
import 'core-js/actual/array/group-by';

export default class UserRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    const [user] = await User(options.database).create(
      [data],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async createFromAuth(
    data,
    options: IRepositoryOptions,
  ) {
    data = this._preSave(data);

    let [user] = await User(options.database).create(
      [data],
      options,
    );

    delete user.password;
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updatePassword(
    id,
    password,
    invalidateOldTokens: boolean,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const data: any = {
      password,
      updatedBy: currentUser.id,
    };

    if (invalidateOldTokens) {
      data.jwtTokenInvalidBefore = new Date();
    }

    await User(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          password: 'secret',
        },
      },
      options,
    );

    return this.findById(id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updateProfile(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    await User(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: currentUser.id,
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async generateEmailVerificationToken(
    email,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const emailVerificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const emailVerificationTokenExpiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerificationToken,
        emailVerificationTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
        },
      },
      options,
    );

    return emailVerificationToken;
  }

  static async generatePasswordResetToken(
    email,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const passwordResetToken = crypto
      .randomBytes(20)
      .toString('hex');
    const passwordResetTokenExpiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        passwordResetToken,
        passwordResetTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          passwordResetToken,
          passwordResetTokenExpiresAt,
        },
      },
      options,
    );

    return passwordResetToken;
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    await User(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: currentUser.id,
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async updateStatus(
    id,
    status,
    options: IRepositoryOptions,
  ) {
    await User(options.database).updateOne(
      { _id: id },
      {
        $set: {
          status,
        },
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status: user.status,
        },
      },
      options,
    );

    return user;
  }

  static async findByEmail(
    email,
    options: IRepositoryOptions,
  ) {
    const record = await this.findByEmailWithoutAvatar(
      email,
      options,
    );
    return await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
    );
  }

  static async findByEmailWithoutAvatar(
    email,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findOne({
          email: {
            $regex: new RegExp(
              `^${MongooseQueryUtils.escapeRegExp(email)}$`,
            ),
            $options: 'i',
          },
        })
        .populate('avatars')
        .populate('identityImages'),
      options,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    role,
    options: IRepositoryOptions,
  ) {
    let criteriaAnd: any = [];

    if (role === 'admin') {
      criteriaAnd.push({
        role: {
          $in: ['admin', 'manager'],
        },
      });
    } else if (role === 'customer') {
      criteriaAnd.push({
        role: {
          $eq: 'customer',
        },
      });
    }

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.fullName) {
        criteriaAnd.push({
          ['fullName']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.fullName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.email) {
        criteriaAnd.push({
          ['email']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.email,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.role) {
        criteriaAnd.push({
          role: { $eq: filter.role },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: { $eq: filter.status },
        });
      }

      if (filter.phoneNumber) {
        criteriaAnd.push({
          ['phoneNumber']: {
            $eq: filter.phoneNumber,
          },
        });
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
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('avatars'),
        options,
      );

    const count =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).countDocuments(criteria),
        options,
      );

    rows = await Promise.all(
      rows.map((row) =>
        this._fillRelationsAndFileDownloadUrls(
          row,
          options,
          false,
        ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    role,
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    let criteriaAnd: any = [];

    if (role === 'admin') {
      criteriaAnd.push({
        role: {
          $in: ['admin', 'manager'],
        },
      });
    } else if (role === 'customer') {
      criteriaAnd.push({
        role: {
          $eq: 'customer',
        },
      });
    }

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            fullName: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
          {
            email: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('fullName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find(criteria)
          .limit(limitEscaped)
          .sort(sort)
          .populate('avatars'),
        options,
      );

    rows = await Promise.all(
      rows.map((row) =>
        this._fillRelationsAndFileDownloadUrls(
          row,
          options,
          false,
        ),
      ),
    );

    return rows.map((user) => ({
      id: user.id,
      label: getUserNameOrEmailPrefix(user),
      avatar:
        user.avatars &&
        user.avatars.length &&
        user.avatars[0].downloadUrl
          ? user.avatars[0].downloadUrl
          : null,
    }));
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
      return ids;
    }

    let users = await User(options.database)
      .find({
        _id: {
          $in: ids,
        },
      })
      .select(['_id']);

    return users.map((user) => user._id);
  }

  static async findByIdWithPassword(
    id,
    options: IRepositoryOptions,
  ) {
    return await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findById(id),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .populate('avatars')
          .populate('identityImages'),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    record = await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
      metaOnly,
    );

    return record;
  }

  static async findPassword(
    id,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .select('+password'),
        options,
      );

    if (!record) {
      return null;
    }

    return record.password;
  }

  static async findByIdWithoutAvatar(
    id,
    options: IRepositoryOptions,
  ) {
    return this.findById(id, options);
  }

  static async findByPasswordResetToken(
    token,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
      }),
      options,
    );
  }

  static async findByEmailVerificationToken(
    token,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          $gt: Date.now(),
        },
      }),
      options,
    );
  }

  static async findByInvitationToken(
    token,
    options: IRepositoryOptions,
  ) {
    return await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        invitationToken: { $eq: token },
      }),
      options,
    );
  }

  static async acceptInvitation(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let invitationUser = await this.findByInvitationToken(
      invitationToken,
      options,
    );

    const isSameEmailFromInvitation =
      invitationUser.id === currentUser.id;

    // Auto-verifies email if the invitation token matches the same email
    const emailVerified =
      currentUser.emailVerified ||
      isSameEmailFromInvitation;

    await User(options.database).updateOne(
      { _id: currentUser.id },
      {
        emailVerified,
        invitationToken: null,
        status: selectStatus('active', invitationUser.role),
        role: invitationUser.role,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: currentUser.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: currentUser.email,
          role: invitationUser.role,
          status: selectStatus(
            'active',
            invitationUser.role,
          ),
        },
      },
      options,
    );
  }

  static async markEmailVerified(
    id,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          emailVerified: true,
        },
      },
      options,
    );

    return true;
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(filter),
      options,
    );
  }

  static async countCountry(options: IRepositoryOptions) {
    let customers =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).find({
          role: { $eq: 'customer' },
        }),
        options,
      );

    let countries: Array<any> = [];

    for (let i = 0; i < customers.length; i++) {
      if (
        customers[i].country &&
        !countries.some(
          (country) => country === customers[i].country,
        )
      )
        countries.push(customers[i].country);
    }

    return countries.length;
  }

  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || '').trim()} ${(
        data.lastName || ''
      ).trim()}`.trim();
    }

    if (data.email) {
      data.email = data.email.trim();
    }

    data.firstName = data.firstName
      ? data.firstName.trim()
      : null;

    data.lastName = data.lastName
      ? data.lastName.trim()
      : null;

    return data;
  }

  static async _fillRelationsAndFileDownloadUrls(
    record,
    options: IRepositoryOptions,
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

    output.avatars =
      await FileRepository.cleanupForRelationships(
        output.avatars,
        options,
      );

    output.identityImages =
      await FileRepository.cleanupForRelationships(
        output.identityImages,
        options,
      );

    return output;
  }

  static async createFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options,
  ) {
    let data = {
      email,
      emailVerified,
      providerId,
      provider,
      firstName,
      lastName,
      role: 'customer',
      status: 'pending',
    };

    data = this._preSave(data);

    let [user] = await User(options.database).create(
      [data],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static REQUIRED_FIELDS = [
    '_id',
    'id',
    'firstName',
    'lastName',
    'email',
    'avatars',
  ];

  static async cleanupForRelationships(
    userOrUsers,
    options: IRepositoryOptions,
  ) {
    if (!userOrUsers) {
      return userOrUsers;
    }

    if (Array.isArray(userOrUsers)) {
      return await Promise.all(
        userOrUsers.map(async (user) => {
          return lodash.pick(
            {
              ...user,
              avatars:
                await FileRepository.cleanupForRelationships(
                  user.avatars,
                  options,
                  true,
                ),
            },
            this.REQUIRED_FIELDS,
          );
        }),
      );
    }

    return lodash.pick(
      {
        ...userOrUsers,
        avatars:
          await FileRepository.cleanupForRelationships(
            userOrUsers.avatars,
            options,
            true,
          ),
      },
      this.REQUIRED_FIELDS,
    );
  }

  static async destroy(id, options: IRepositoryOptions) {
    let user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findOne({
          _id: id,
        }),
        options,
      );

    if (!user) {
      throw new Error404();
    }

    await User(options.database).deleteOne(
      { _id: id },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.DELETE,
        values: {
          email: user.email,
        },
      },
      options,
    );
  }
}

function selectStatus(oldStatus, newRole) {
  newRole = newRole || [];

  if (oldStatus === 'invited') {
    return oldStatus;
  }

  if (!newRole) {
    return 'empty';
  }

  return 'active';
}

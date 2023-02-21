import { IServiceOptions } from './IServiceOptions';
import MongooseRepository from '../database/repositories/mongooseRepository';
import UserRepository from '../database/repositories/userRepository';

export default class DashboardService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async countTotalCustomer() {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const count = await UserRepository.count(
        {
          role: 'customer',
        },
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return { count };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'dashboard',
      );

      throw error;
    }
  }

  async countVerifiedCustomer() {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const count = await UserRepository.count(
        {
          role: 'customer',
          status: 'active',
        },
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return { count };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'dashboard',
      );

      throw error;
    }
  }

  async countRequestedCustomer() {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const count = await UserRepository.count(
        {
          role: 'customer',
          status: 'requested',
        },
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return { count };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'dashboard',
      );

      throw error;
    }
  }

  async countCountry() {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const count = await UserRepository.countCountry({
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return { count };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'dashboard',
      );

      throw error;
    }
  }
}

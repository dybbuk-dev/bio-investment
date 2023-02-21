import assert from 'assert';
import Error400 from '../../errors/Error400';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import UserRepository from '../../database/repositories/userRepository';
import { IServiceOptions } from '../IServiceOptions';

export default class UserEditor {
  options: IServiceOptions;
  data;
  session;
  user;

  constructor(options) {
    this.options = options;
  }

  async update(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._loadUser();
      await this._updateAtDatabase();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );

      throw error;
    }
  }

  get _role() {
    return this.data.role;
  }

  async _loadUser() {
    this.user = await UserRepository.findById(
      this.data.id,
      this.options,
    );

    if (!this.user) {
      throw new Error400(
        this.options.language,
        'user.errors.userNotFound',
      );
    }
  }

  async _updateAtDatabase() {
    await UserRepository.update(this.data.id, this.data, {
      ...this.options,
      session: this.session,
    });
  }

  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );
    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data.id, 'id is required');
  }
}

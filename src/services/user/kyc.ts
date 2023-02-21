import assert from 'assert';
import EmailSender from '../../services/emailSender';
import UserRepository from '../../database/repositories/userRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import { getConfig } from '../../config';
import { IServiceOptions } from '../IServiceOptions';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const BCRYPT_SALT_ROUNDS = 12;

export default class Kyc {
  options: IServiceOptions;
  session;
  id;
  email;

  constructor(options) {
    this.options = options;
    this.session = null;
  }

  async accept(id) {
    this.id = id;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._accept();
      await this._getEmail();
      await this._sendAcceptEmail();

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

  async reject(id) {
    this.id = id;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._reject();
      await this._getEmail();
      await this._sendRejectEmail();

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

  async _accept() {
    await UserRepository.updateStatus(this.id, 'active', {
      ...this.options,
      session: this.session,
    });
  }

  async _reject() {
    await UserRepository.updateStatus(this.id, 'rejected', {
      ...this.options,
      session: this.session,
    });
  }

  async _getEmail() {
    this.email = await UserRepository.findById(
      this.id,
      { ...this.options, session: this.session },
      true,
    );
  }

  async _sendAcceptEmail() {
    return new EmailSender(
      EmailSender.TEMPLATES.KYC_REQUEST_ACCEPTED,
      {},
    ).sendTo(this.email);
  }

  async _sendRejectEmail() {
    return new EmailSender(
      EmailSender.TEMPLATES.KYC_REQUEST_REJECTED,
      {},
    ).sendTo(this.email);
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

    assert(this.id, 'Customer ID is required');
  }
}

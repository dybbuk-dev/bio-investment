import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('user');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const UserSchema = new Schema(
    {
      fullName: { type: String, maxlength: 255 },
      firstName: { type: String, maxlength: 80 },
      lastName: { type: String, maxlength: 175 },
      phoneNumber: { type: String, maxlength: 24 },
      email: {
        type: String,
        maxlength: 255,
        index: { unique: true },
        required: true,
      },
      password: {
        type: String,
        maxlength: 255,
        select: false,
      },
      birthday: {
        type: Date,
      },
      address: {
        type: String,
      },
      state: {
        type: String,
        maxlength: 255,
      },
      city: {
        type: String,
        maxlength: 255,
      },
      country: {
        type: String,
        maxlength: 255,
      },
      nationality: {
        type: String,
        maxlength: 255,
      },
      identityType: {
        type: String,
        maxlength: 255,
      },
      identityImages: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      emailVerified: { type: Boolean, default: false },
      emailVerificationToken: {
        type: String,
        maxlength: 255,
        select: false,
      },
      emailVerificationTokenExpiresAt: { type: Date },
      passwordResetToken: {
        type: String,
        maxlength: 255,
        select: false,
      },
      passwordResetTokenExpiresAt: { type: Date },
      avatars: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      jwtTokenInvalidBefore: { type: Date },
      provider: {
        type: String,
        maxlength: 50,
      },
      providerId: {
        type: String,
        maxlength: 255,
      },
      role: { type: String, maxlength: 255 },
      invitationToken: { type: String, maxlength: 255 },
      status: {
        type: String,
        required: true,
        enum: [
          'active',
          'invited',
          'pending',
          'requested',
          'rejected',
        ],
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String, maxlength: 255 },
    },
    {
      timestamps: true,
    },
  );

  UserSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  UserSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  UserSchema.set('toJSON', {
    getters: true,
  });

  UserSchema.set('toObject', {
    getters: true,
  });

  return database.model('user', UserSchema);
};

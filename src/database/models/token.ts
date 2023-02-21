import mongoose from 'mongoose';
import mongooseFloat from 'mongoose-float';
const Schema = mongoose.Schema;
const Float2 = mongooseFloat.loadType(mongoose, 2);
const Float6 = mongooseFloat.loadType(mongoose, 6);

export default (database) => {
  try {
    return database.model('token');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TokenSchema = new Schema(
    {
      tokenNumber: { type: Number },
      name: { type: String, maxlength: 255 },
      description: {
        type: String,
      },
      status: {
        type: String,
      },
      category: {
        type: String,
      },
      tokenAddress: {
        type: String,
        maxlength: 50,
      },
      suppliedTokensNumber: {
        type: Float2,
      },
      investorsNumber: {
        type: Number,
        min: 0,
      },
      tokenPrice: {
        type: Float2,
      },
      tokenizedCostAmount: {
        type: Float2,
      },
      softcap: {
        type: Float2,
      },
      hardcap: {
        type: Float2,
      },
      tokenDuration: {
        type: Number,
      },
      tokenImage: {
        type: Schema.Types.ObjectId,
        ref: 'file',
      },
      monthlyProfit: {
        type: Float2,
      },
      APY: {
        type: Float2,
      },
      minAmountOnSelling: {
        type: Float2,
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

  TokenSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  TokenSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TokenSchema.set('toJSON', {
    getters: true,
  });

  TokenSchema.set('toObject', {
    getters: true,
  });

  return database.model('token', TokenSchema);
};

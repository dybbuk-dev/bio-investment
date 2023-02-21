import mongoose from 'mongoose';
import mongooseFloat from 'mongoose-float';
const Schema = mongoose.Schema;
const Float2 = mongooseFloat.loadType(mongoose, 2);
const Float6 = mongooseFloat.loadType(mongoose, 6);

export default (database) => {
  try {
    return database.model('property');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PropertySchema = new Schema(
    {
      propertyNumber: { type: Number },
      name: { type: String, maxlength: 255 },
      country: { type: String, maxlengh: 50 },
      city: { type: String, maxlength: 50 },
      propertyType: { type: String, maxlength: 50 },
      address: { type: String, maxlength: 255 },
      coordinates: [
        {
          type: Float6,
        },
      ],
      tokenName: {
        type: String,
        maxlength: 50,
      },
      description: {
        type: String,
      },
      initialRentDate: {
        type: Date,
      },
      durationProjectInMonth: {
        type: Number,
        min: 0,
        max: 200,
      },
      status: {
        type: String,
      },
      tokenAddress: {
        type: String,
        maxlength: 50,
      },
      initialDateSTO: {
        type: Date,
      },
      endDateSTO: {
        type: Date,
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
      photographs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      TIR: {
        type: Float2,
      },
      accumulatedAndDistributedProfits: {
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

  PropertySchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PropertySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PropertySchema.set('toJSON', {
    getters: true,
  });

  PropertySchema.set('toObject', {
    getters: true,
  });

  return database.model('property', PropertySchema);
};

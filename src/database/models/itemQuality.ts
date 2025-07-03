 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('itemQuality');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ItemQualitySchema = new Schema(
    {
      name: {
        type: String,
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },

      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  ItemQualitySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ItemQualitySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ItemQualitySchema.set('toJSON', {
    getters: true,
  });

  ItemQualitySchema.set('toObject', {
    getters: true,
  });

  return database.model('itemQuality', ItemQualitySchema);
};
 
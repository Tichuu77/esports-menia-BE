 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('goodsType');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const GoodsTypeSchema = new Schema(
    {
      name: {
        type: String,
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

  GoodsTypeSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  GoodsTypeSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  GoodsTypeSchema.set('toJSON', {
    getters: true,
  });

  GoodsTypeSchema.set('toObject', {
    getters: true,
  });

  return database.model('goodsType', GoodsTypeSchema);
};
 

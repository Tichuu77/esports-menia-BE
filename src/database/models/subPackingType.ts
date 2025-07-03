 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('subPackingType');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SubPackingTypeSchema = new Schema(
    {
      name: {
        type: String,
      },

      packingType: {
        type: Schema.Types.ObjectId,
        ref: 'packing',
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

  SubPackingTypeSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  SubPackingTypeSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SubPackingTypeSchema.set('toJSON', {
    getters: true,
  });

  SubPackingTypeSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'subPackingType',
    SubPackingTypeSchema,
  );
};
 

 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('size');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SizeSchema = new Schema(
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

  SizeSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  SizeSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SizeSchema.set('toJSON', {
    getters: true,
  });

  SizeSchema.set('toObject', {
    getters: true,
  });

  return database.model('size', SizeSchema);
};
 

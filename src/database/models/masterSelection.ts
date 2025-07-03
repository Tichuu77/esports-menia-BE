 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('masterSelection');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const MasterSelectionSchema = new Schema(
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

  MasterSelectionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  MasterSelectionSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  MasterSelectionSchema.set('toJSON', {
    getters: true,
  });

  MasterSelectionSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'masterSelection',
    MasterSelectionSchema,
  );
};
 

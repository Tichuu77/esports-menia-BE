 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('year');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const YearSchema = new Schema(
    {
      name: {
        type: String,
      },

      fromDate: {
        type: Date,
      },

      toDate: {
        type: Date,
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

  YearSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  YearSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  YearSchema.set('toJSON', {
    getters: true,
  });

  YearSchema.set('toObject', {
    getters: true,
  });

  return database.model('year', YearSchema);
};
 

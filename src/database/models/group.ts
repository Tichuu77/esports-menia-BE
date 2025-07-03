

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('group');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const GroupSchema = new Schema(
    {
      name: {
        type: String,
      },

      balanceSheetGroup: {
        type: Schema.Types.ObjectId,
        ref: 'balanceSheet',
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

  GroupSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  GroupSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  GroupSchema.set('toJSON', {
    getters: true,
  });

  GroupSchema.set('toObject', {
    getters: true,
  });

  return database.model('group', GroupSchema);
};


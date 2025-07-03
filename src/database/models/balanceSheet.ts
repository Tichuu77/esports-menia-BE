 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('balanceSheet');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const BalanceSheetSchema = new Schema(
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

  BalanceSheetSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  BalanceSheetSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  BalanceSheetSchema.set('toJSON', {
    getters: true,
  });

  BalanceSheetSchema.set('toObject', {
    getters: true,
  });

  return database.model('balanceSheet', BalanceSheetSchema);
};
 

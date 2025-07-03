 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('expenseAccount');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ExpenseAccountSchema = new Schema(
    {
      name: {
        type: String,
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
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

  ExpenseAccountSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ExpenseAccountSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ExpenseAccountSchema.set('toJSON', {
    getters: true,
  });

  ExpenseAccountSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'expenseAccount',
    ExpenseAccountSchema,
  );
};
 

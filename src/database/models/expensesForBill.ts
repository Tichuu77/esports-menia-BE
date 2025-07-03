 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('expensesForBill');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ExpensesForBillSchema = new Schema(
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      expenseAccount: {
        type: Schema.Types.ObjectId,
        ref: 'expenseAccount',
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },
      operator: {
        type: String,
        enum: ['Percent', 'Perunit', 'Fixed', null],
      },

      value: {
        type: Number,
      },

      expenseType: {
        type: String,
        enum: ['Credit', 'Debit', null],
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

  ExpensesForBillSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ExpensesForBillSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ExpensesForBillSchema.set('toJSON', {
    getters: true,
  });

  ExpensesForBillSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'expensesForBill',
    ExpensesForBillSchema,
  );
};
 

 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('expensesForTransaction');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ExpensesForTransactionSchema = new Schema(
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },

      expenseAccount: {
        type: Schema.Types.ObjectId,
        ref: 'expenseAccount',
      },

      goodsType: {
        type: Schema.Types.ObjectId,
        ref: 'goodsType',
      },
      value: {
        type: Number,
      },

      operator: {
        type: String,
        enum: ['Percent', 'Perunit', 'Fixed', null],
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

  ExpensesForTransactionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ExpensesForTransactionSchema.virtual('id').get(
    function () {
      // @ts-ignore
      return this._id.toHexString();
    },
  );

  ExpensesForTransactionSchema.set('toJSON', {
    getters: true,
  });

  ExpensesForTransactionSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'expensesForTransaction',
    ExpensesForTransactionSchema,
  );
};
 

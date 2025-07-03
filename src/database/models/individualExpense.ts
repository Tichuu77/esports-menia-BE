 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('individualExpense');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const IndividualExpenseSchema = new Schema(
    {
      rate: {
        type: String,
      },

      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      subGroup: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
      },
      operator: {
        type: String,
        enum: ['Percent', 'Perunit', 'Fixed', null],
      },

      expenseAccount: {
        type: Schema.Types.ObjectId,
        ref: 'expenseAccount',
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

  IndividualExpenseSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  IndividualExpenseSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  IndividualExpenseSchema.set('toJSON', {
    getters: true,
  });

  IndividualExpenseSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'individualExpense',
    IndividualExpenseSchema,
  );
};
 

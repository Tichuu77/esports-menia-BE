 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('openingYear');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const OpeningYearSchema = new Schema(
    {
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
      amount: {
        type: Number,
      },

      creditUnitAmount: {
        type: Number,
      },

      creditDay: {
        type: Number,
      },

      reminderDay: {
        type: Number,
      },

      collectionDay: {
        type: Number,
      },

      securityDeposit: {
        type: Number,
      },

      securityDepositDate: {
        type: Date,
      },

      expenseRequired: {
        type: Boolean,
        default: false,
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

  OpeningYearSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  OpeningYearSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  OpeningYearSchema.set('toJSON', {
    getters: true,
  });

  OpeningYearSchema.set('toObject', {
    getters: true,
  });

  return database.model('openingYear', OpeningYearSchema);
};
 

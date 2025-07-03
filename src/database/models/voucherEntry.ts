 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('voucherEntry');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const VoucherEntrySchema = new Schema(
    {
      voucherEntryType: {
        type: String,
        enum: [
          'Payment',
          'Received',
          'Journal_Entry',
          null,
        ],
      },

      date: {
        type: Date,
      },

      group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
      },

      subGroup: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
      },
      amount: {
        type: Number,
      },

      paymentType: {
        type: String,
        enum: ['Credit', 'Debit', null],
      },

      paymentMode: {
        type: String,
      },

      remarks: {
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

  VoucherEntrySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  VoucherEntrySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  VoucherEntrySchema.set('toJSON', {
    getters: true,
  });

  VoucherEntrySchema.set('toObject', {
    getters: true,
  });

  return database.model('voucherEntry', VoucherEntrySchema);
};
 

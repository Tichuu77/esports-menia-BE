 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('coldStorage');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ColdStorageSchema = new Schema(
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      goodsArrival: {
        type: Schema.Types.ObjectId,
        ref: 'goodsArrival',
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },

      storeExpense: {
        type: Schema.Types.ObjectId,
        ref: 'expensesForBill',
      },

      subGroup: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
      },

      sale: {
        type: Schema.Types.ObjectId,
        ref: 'goodsSales',
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

  ColdStorageSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ColdStorageSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ColdStorageSchema.set('toJSON', {
    getters: true,
  });

  ColdStorageSchema.set('toObject', {
    getters: true,
  });

  return database.model('coldStorage', ColdStorageSchema);
};
 

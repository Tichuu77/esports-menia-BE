 
import mongoose from 'mongoose';
import subPartyGoodsArrival from './subPartyGoodsArrival';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('goodsSales');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const GoodsSalesSchema = new Schema(
    {
      goodsArrival:{
        type: Schema.Types.ObjectId,
        ref: 'goodsArrival',
      },
      saleDate: {
        type: Date,
        default: new Date(),
      },

      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      buyerName: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
      },

      purchaNumber: {
        type: String,
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },

      size: {
        type: Schema.Types.ObjectId,
        ref: 'size',
      },

      packing: {
        type: Schema.Types.ObjectId,
        ref: 'packing',
      },

      quality: {
        type: Schema.Types.ObjectId,
        ref: 'itemQuality',
      },
      rate: {
        type: String,
      },

      quantity: {
        type: Number,
      },

      sizes: [
        {
          subPackingSize: {
            type: Schema.Types.ObjectId,
            ref: 'subPackingType',
          },
          quantity: {
            type: Number,
            default: 0,
          },
          rate: {
            type: Number,
            default: 0,
          },
          grossTotal: {
            type: Number,
            default: 0,
          },
        },
      ],

      buyerGrossTotal: {
        type: Number,
        default: 0,
      },

      hasBuyerExpenses:{
        type: Boolean,
        default: false,
      },
      buyerExpenses: [
        {
          expense: {
            type: Schema.Types.ObjectId,
            ref: 'expensesForTransaction',
          },
          value: {
            type: Number,
            default: 0,
          },
          operator: {
            type: String,
          },
          expenseType: {
            type: String,
          },
          totalValue:{
            type: Number,
            default: 0,
          }

        }
      ],
      buyerExpensesGrossTotal:{
        type: Number,
        default: 0,
      },
      netTotal:{
        type: Number,
        default: 0,
      },
      buyerLimitExceed:{
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

  GoodsSalesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  GoodsSalesSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  GoodsSalesSchema.set('toJSON', {
    getters: true,
  });

  GoodsSalesSchema.set('toObject', {
    getters: true,
  });

  return database.model('goodsSales', GoodsSalesSchema);
};
 

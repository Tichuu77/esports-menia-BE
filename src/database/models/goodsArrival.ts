 
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('goodsArrival');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const GoodsArrivalSchema = new Schema(
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true,
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
        required: true,
      },
      arrivalDate: {
        type: Date,
        required: true,
      },

      goodsType: {
        type: Schema.Types.ObjectId,
        ref: 'goodsType',
        required: true,
      },

      mainSupplier: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
        required: true,
      },

      mainSupplierGrossTotal: {
        type: Number,
        default: 0,
      },

      netTotal: {
        type: Number,
        default: 0,
      },
      totalQuantity: {
        type: Number,
        default: 0,
      },
      quantityLeft:{
        type: Number,
        default: 0,
      },
      totalValue: {
      },

      qualities: [
        {
          quality: {
            type: Schema.Types.ObjectId,
            ref: 'itemQuality',
          },
          lotNumber: {
            type: String,
          },
          packing: {
            type: Schema.Types.ObjectId,
            ref: 'packing',
          },
          quantity: {
            type: Number,
            default: 0,
          },
          quantityLeft: {
            type: Number,
            default: 0,
          },
          size: {
            type: Schema.Types.ObjectId,
            ref: 'size',
          },
          subPartyName: {
            type: String
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
              quantityLeft: {
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
              }
            }
          ],
          grossTotal: {
            type: Number,
            default: 0,
          }
        }
      ],

      truckNumber: {
        type: String,
      },

      crGrNumber: {
        type: String,
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true,
      },
      growerExpenses: [
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
          totalValue: {
            type: Number,
            default: 0
          }

        }
      ],
      growerExpensesGrossTotal: {
        type: Number,
        default: 0
      },
      hasGrowerExpenses: {
        type: Boolean,
        default: false,
      },
      isCashSale: {
        type: Boolean,
        default: false,
      },
      entryType: {
        type: String,
        enum: [
          'grower',
          'buyer',
          'together',
        ],
        default: 'grower',
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

  GoodsArrivalSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  GoodsArrivalSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  GoodsArrivalSchema.set('toJSON', {
    getters: true,
  });

  GoodsArrivalSchema.set('toObject', {
    getters: true,
  });

  return database.model('goodsArrival', GoodsArrivalSchema);
};
 

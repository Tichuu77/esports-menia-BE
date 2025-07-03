 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('subPartyGoodsArrival');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SubPartyGoodsArrivalSchema = new Schema(
    {
      subSupplierName: {
        type: String,
      },

      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },

      quality: {
        type: Schema.Types.ObjectId,
        ref: 'itemQuality',
      },
      quantity: {
        type: Number,
      },

      packaging: {
        type: Schema.Types.ObjectId,
        ref: 'packing',
      },
      quantityLeft: {
        type: Number,
      },

      year: {
        type: Schema.Types.ObjectId,
        ref: 'year',
      },

      company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },

      goodsArrival: {
        type: Schema.Types.ObjectId,
        ref: 'goodsArrival',
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

  SubPartyGoodsArrivalSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  SubPartyGoodsArrivalSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SubPartyGoodsArrivalSchema.set('toJSON', {
    getters: true,
  });

  SubPartyGoodsArrivalSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'subPartyGoodsArrival',
    SubPartyGoodsArrivalSchema,
  );
};
 

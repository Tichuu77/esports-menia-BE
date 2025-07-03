 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('item');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ItemSchema = new Schema(
    {
      name: {
        type: String,
      },

      unit: {
        type: Number,
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

  ItemSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ItemSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ItemSchema.set('toJSON', {
    getters: true,
  });

  ItemSchema.set('toObject', {
    getters: true,
  });

  return database.model('item', ItemSchema);
};
 

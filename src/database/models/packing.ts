 

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('packing');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PackingSchema = new Schema(
    {
      name: {
        type: String,
      },
     sizes:[
      {
      size: {
        type: Schema.Types.ObjectId,
        ref: 'size',
      }
    }
    ],

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

  PackingSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PackingSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PackingSchema.set('toJSON', {
    getters: true,
  });

  PackingSchema.set('toObject', {
    getters: true,
  });

  return database.model('packing', PackingSchema);
};
 
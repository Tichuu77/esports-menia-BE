 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('subGroup');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SubGroupSchema = new Schema(
    {
      group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
      },
      name: {
        type: String,
      },

      addressOne: {
        type: String,
      },

      addressTwo: {
        type: String,
      },

      city: {
        type: String,
      },

      state: {
        type: String,
      },

      agent: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
      },

      referenceParty: {
        type: Schema.Types.ObjectId,
        ref: 'subGroup',
      },
      pan: {
        type: String,
      },

      bankName: {
        type: String,
      },

      branch: {
        type: String,
      },

      iFSCode: {
        type: String,
      },

      accountNumber: {
        type: String,
      },
      number:{
        type: String,
      },
      identifier:{
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

  SubGroupSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  SubGroupSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SubGroupSchema.set('toJSON', {
    getters: true,
  });

  SubGroupSchema.set('toObject', {
    getters: true,
  });

  return database.model('subGroup', SubGroupSchema);
};
 

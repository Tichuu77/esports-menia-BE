import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('coinaccount');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CoinAccountSchema = new Schema(
    {
      coins:{
        type: Number,
        default:25,
        min:0,
        max: 100000,
      },
      user:{
        type: Schema.Types.ObjectId,
        ref : 'user',
      },
      refferBy:{
        type: Schema.Types.ObjectId,
        ref : 'user',
      },
      refferals:[
        {
          type: Schema.Types.ObjectId,
          ref : 'user',
        }
      ],
      refralReward:{
        type:Number,
        default:0,
        min:0,
        max:100000,
      },
      refralRewardCount:{
        type:Number,
        default:0,
        min:0,
        max:10,
    },

      bonasReward:{
        type:Number,
        default:25,
        min:25,
        max:25,
      },
      winReward:{
       type:Number,
       default:0,
       min:0,
       max:100000,
      },
      withdralReward:{
        type:Number,
        default:0,
        min:0,
        max:100000,
      },
      lastLoginDate:{
       type:Date,
       default: new Date,
      },

     isLimitExced:{
        type:Boolean,
        default:false,
    },
    isBlock:{
        type:Boolean,
        default:false,
    }
    },
    { timestamps: true },
  );

  
  CoinAccountSchema.set('toJSON', {
    getters: true,
  });

  CoinAccountSchema.set('toObject', {
    getters: true,
  });

  return database.model('coinaccount', CoinAccountSchema);
};

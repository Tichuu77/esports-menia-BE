import { giveDailyLoginReward } from "../database/utils/dailyLoginReward";

export const dailyRewardMiddleware = async (req, res, next) => {
  try {
    if (!req.currentUser) {
      return next(); // user not set yet, skip
    }

    // Give daily reward
    await giveDailyLoginReward(req.currentUser._id,req);

    next();
  } catch (error) {
    console.error("Daily reward middleware error:", error);
    next(); // don't block request if reward fails
  }
};

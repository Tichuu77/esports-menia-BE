import CoinAccount from "../models/coinAccount";
import { IRepositoryOptions } from "../repositories/IRepositoryOptions";

export const giveDailyLoginReward = async (userId: string, options: IRepositoryOptions) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // midnight today
    try {


        let account = await CoinAccount(options.database).findOne({ user: userId });

        // If account doesn't exist, create one
        if (!account) {
            account = await CoinAccount(options.database).create({
                user: userId,
                coins: 25, // default starting balance
                lastLoginDate: new Date(),
            });
            return account;
        }

        // Check if user already got reward today
        const lastLogin = new Date(account.lastLoginDate);
        lastLogin.setHours(0, 0, 0, 0);

        if (lastLogin.getTime() === today.getTime()) {
            // Already rewarded today
            return account;
        }

        // ✅ Add daily reward
        const dailyReward = 1; // fallback if not set
        account.coins += dailyReward;
        account.lastLoginDate = new Date();
        await account.save();
 
    }

    catch (error) {
        console.error('Error giving daily login reward:', error)
    }

};
// jobs/cleanupInvitedUsers.ts
import cron from 'node-cron';
import User from '../database/models/user';
import MongooseRepository from '../database/repositories/mongooseRepository';
import CoinAccount from '../database/models/coinAccount';

export default function scheduleCleanupJob(database) {
  // Run daily at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      // 1️⃣ Find invited users older than 3 days
      const usersToDelete = await User(database).find({
        status: 'invited',
        createdAt: { $lt: threeDaysAgo },
        emailVerified: false,
      });

      if (!usersToDelete.length) {
        console.log("🧹 Cleanup job: no invited users to delete");
        return;
      }

      // 2️⃣ Remove their references from CoinAccount.refferals
      await Promise.all(
        usersToDelete.map(async (user) => {
          await MongooseRepository.destroyRelationToMany(
            user._id,
            CoinAccount(database),   // ⚠️ pass model bound to DB
            'refferals.user',
            database,
          );
        }),
      );

      // 3️⃣ Finally delete users
      const result = await User(database).deleteMany({
        _id: { $in: usersToDelete.map((u) => u._id) },
      });

      console.log(`🧹 Cleanup job: deleted ${result.deletedCount} invited users`);
    } catch (error) {
      console.error("❌ Cleanup job failed:", error);
    }
  });
}

import { databaseInit } from "../database/databaseConnection";
import scheduleCleanupJob from "./cleanupInvitedUsers";

async function initializeJobs() {
const database = await databaseInit();
scheduleCleanupJob(database);
}

initializeJobs()
  .then(() => console.log("Jobs initialized successfully"))
  .catch((error) => {
    console.error("Error initializing jobs:", error);
  });
const { Worker } = require("bullmq");

const worker = new Worker(
  "notificationQueue",
  async (job) => {
    const { studentId, message } = job.data;

    console.log(`Sending notification to ${studentId}: ${message}`);

    // simulate sending notification
    return true;
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed: ${err.message}`);
});
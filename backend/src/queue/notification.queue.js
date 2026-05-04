let notificationQueue = null;

try {
  const { Queue } = require("bullmq");

  notificationQueue = new Queue("notificationQueue", {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  });
} catch (err) {
  console.log("Queue disabled (Redis not running)");
}

module.exports = notificationQueue;
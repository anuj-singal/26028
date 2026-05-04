const { createClient } = require("redis");

const client = createClient({
  socket: {
    reconnectStrategy: false, 
  },
});

client.on("error", () => {
  console.log("Redis not available, skipping...");
});

module.exports = { client };
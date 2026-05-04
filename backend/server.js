const app = require("./src/app");
const connectDB = require("./src/config/db");
const { connectRedis } = require("./src/config/redis");

connectDB();
// connectRedis();

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
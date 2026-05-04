const express = require("express");
const app = express();

app.use(express.json());

const logger = require("./middleware/logger");
app.use(logger);

app.use("/api/notifications", require("./routes/notification.routes"));


app.get("/", (req, res) => {
  res.send("Server running");
});

module.exports = app;
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/log-ip", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const log = `[${new Date().toISOString()}] - IP: ${ip}\n`;
  fs.appendFile("logs.txt", log, (err) => {
    if (err) console.error("Failed to write IP:", err);
  });
  res.sendFile(__dirname + "/transparent.gif");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

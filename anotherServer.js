const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.status(500).json({ error: "message" });
});

app.listen(port, () => {
  console.log("app running on ", port);
});

const express = require("express");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "this is a secret token ssshhhh!!!";
const { auth } = require("./middleware");
const app = express();
const port = 5000;
const jsonParser = bodyParser.json();

app.use(jsonParser);
const USERS = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  const existingUser = USERS.find((user) => user.email === email);

  if (existingUser)
    return res.status(409).json({ error: "User already exists" });

  USERS.push({ email, password });
  return res.status(200).json({ message: "Success" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const userExists = USERS.find((user) => user.email === email);
  const token = jwt.sign({ email }, JWT_SECRET);
  if (userExists) return res.status(200).json({ token });
});

app.get("/me", auth, (req, res) => {
  const user = USERS.find((user) => user.email === req.email);
  res.json({ email: user.email, id: 2 });
});

app.listen(port, () => {
  console.log("Server started on ", port);
});

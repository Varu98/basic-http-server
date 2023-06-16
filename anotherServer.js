const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const USERS = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", (req, res) => {
  // Add logic to decode body
  // body should have email and password
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  // return back 200 status code to the client
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
  if (userExists) return res.status(200).json();
});

app.listen(port, () => {
  console.log("Server started on ", port);
});

const express = require("express");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "this is a secret token ssshhhh!!!";
const { auth } = require("./middleware");
const { QUESTIONS } = require("./questions");
const app = express();
const port = 5000;
const jsonParser = bodyParser.json();

app.use(jsonParser);

const USERS = [];
const SUBMISSIONS = [];

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

app.get("/problems", (req, res) => {
  return res.status(200).json(QUESTIONS);
});

app.get("/problem/:id", (req, res) => {
  const { id } = req.params;
  const problem = QUESTIONS.find((problem) => problem.problemId === id);
  console.log(problem);
  return res.json({ problem });
});

app.get("/submission", auth, (req, res) => {
  const { problemID, submission } = req.body;

  const isCorrect = Math.random() < 0.5;

  if (isCorrect) {
    SUBMISSIONS.push({ problemID, submission, status: "Accepted" });
    return res.json({ status: "Accepted" });
  } else {
    SUBMISSIONS.push({ problemID, submission, status: "Rejected" });
    return res.json({ status: "Rejected" });
  }
});

app.listen(port, () => {
  console.log("Server started on ", port);
});

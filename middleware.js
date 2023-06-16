const jwt = require("jsonwebtoken");
const JWT_SECRET = "this is a secret token ssshhhh!!!";

module.exports = {
  auth: (req, res, next) => {
    console.log("mdi", req.headers);
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (!authHeader)
      return res.status(400).json({ msg: "Missing auth header" });

    const decoded = jwt.verify(authHeader, JWT_SECRET);
    if (decoded.email) {
      req.email = decoded.email;
      next();
    }
    return res.status(400);
  },
};

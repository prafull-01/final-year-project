const jwt = require("jsonwebtoken");
const secret = "Abc!1234%$#@";

function verify(req, res, next) {
  try {
    const token  = req.header("Authorization");
    const result = jwt.verify(token, secret);
    if (result) {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  verify,
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db");
const jwtSecret =
  "b044b80e7b5e18a73a3bb11122833ad7917da75e9cde8592898623b165fb335f3ed647";

exports.adminAuth = (req, res, next) => {
  const token = req.cookies.uid;

  if (token) {
    jwt.verify(token, jwtSecret, (err, jwtDecoded) => {
      if (err) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        if (jwtDecoded.role !== "Admin") {
          res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401).json({
      message: "No authorize token available",
    });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.uid;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized 1", err });
      } else {
        if (decodedToken.role !== "Basic") {
          return res
            .status(401)
            .json({ message: "Not authorized 2", decodedToken, token });
        } else {
          next();
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}


const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is missing");
    }

    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    const verifiedUser = await User.findOne({
      Email: verifiedToken.email,
    }).select("-Password");

    if (!verifiedUser) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = verifiedUser;

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = authMiddleWare;

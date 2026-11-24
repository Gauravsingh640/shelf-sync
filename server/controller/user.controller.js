const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const handleSignupUserController = async (req, res) => {
  const body = req.body;

  try {
    if (!body?.FirstName || !body?.Email || !body?.Password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({
      Email: body.Email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(body.Password, 10);

    const signUp = await User.create({
      ...body,
      Password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      id: signUp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const handleSigninUserController = async (req, res) => {
  const body = req.body;

  try {
    if (!body?.Email || !body?.Password) {
      return res.status(400).json({
        message: "Email and Password are required",
        success: false,
      });
    }

    if (!SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is missing in .env");
    }

    const user = await User.findOne({
      Email: body.Email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.Password,
      user.Password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Password doesn't match",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        email: user.Email,
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  handleSignupUserController,
  handleSigninUserController,
};

const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (user) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel.create({
      username,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user created successfully",
      user: {
        username,
        email,
        role,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "invalid username or email",
    });
  }

  const isPasswordAuthentic = await bcrypt.compare(password, user.password);

  if (!isPasswordAuthentic) {
    return res.status(401).json({
      message: "Password is wrong",
    });
  }

  const token = await jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user login succssfully",
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "user logout successfully",
  });

  console.log("user loged out");
}

module.exports = { registerUser, loginUser, logoutUser };

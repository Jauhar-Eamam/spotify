const UserModel = require("../models/auth.model");
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

    console.log(token);

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


module.exports = { registerUser };

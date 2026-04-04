const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(401).json({
        message: "you have not permission to create a music",
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized!",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(401).json({
        message: "You have not permission for this ",
      });
    }

    next();
  } catch (err) {
    console.log(err);
  }
}

async function authAll(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      message: "unauthorized!",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.role);

    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.status(403).json({
        messaage: "You have not permission for that!",
      });
    }

    next();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { authArtist, authUser, authAll };

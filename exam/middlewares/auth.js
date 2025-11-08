const jwt = require("jsonwebtoken");
const JWT_SECRET = "MY_SECRET_KEY";

exports.auth = (req, res, next) => {
  try {
    let token;

    // Try to get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // or from cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    // ✅ Verify with correct secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("AUTH ERROR =>", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

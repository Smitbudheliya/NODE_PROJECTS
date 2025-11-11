const jwt = require('jsonwebtoken');
const userModel = require('../model/usersModel');

const verifyToken = async (req, res, next) => {
  try {

    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized User: No token provided" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized User: Invalid token format" });
    }

    const { userId } = jwt.verify(token, 'testing');
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: "Unauthorized User: User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("verifyToken error:", error);
    return res.status(401).json({ message: "Unauthorized User: Invalid token" });
  }
};

module.exports = verifyToken;

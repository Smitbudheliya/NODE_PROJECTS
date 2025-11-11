const verifyRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied. You don't have permission for this action."
            });
        }
        next();
    }
}
module.exports = verifyRole;

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user logged in" });
    }

    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access Denied: Insufficient permission" });
    }
    next();
  };
};

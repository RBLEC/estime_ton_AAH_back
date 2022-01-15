const jwt = require (`jsonwebtoken`);

const jwtSecret = process.env.JWT_SECRET;

//* middleware d`authentification de token
function authenticateToken (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(` `) [1]; // `Bearer leToken`
  if (!token) {
      res.status(401).json({
        success: false,
        message: `Veuillez-vous connecter`,
      });
  }
  jwt.verify(token, jwtSecret, (error, userInfoToken)=> {
    if (error) {
      return res.status(401);
    } else {
      userToken = userInfoToken;
    }
  });
  next();
};
module.exports = authenticateToken;

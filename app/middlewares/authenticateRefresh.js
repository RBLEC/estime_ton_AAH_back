const jwt = require (`jsonwebtoken`);

const jwtSecretRefresh = process.env.JWT_SECRET_REFRESH;
const {generateAccessToken }= require(`../middlewares/jwt`);
    
//* middleware d`authentification de token
function authenticateTokenRefresh (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(` `) [1]; // `Bearer leToken`

  console.log(`tokenRefresh middleware :>> `, token);

  if (!token) {
      res.status(401).json({
        success: false,
        message: `Veuillez-vous reconnecter`,
      });
  }
  jwt.verify(token, jwtSecretRefresh, (error, userInfoToken)=> {
    if (error) {
      return res.status(401);
    } else {
      userToken = userInfoToken;
    }
        // TODO: Check en BDD que l`user est toujours existant/autorisé à utiliser la plateforme
    delete userToken.iat;
    delete userToken.exp;
    const refreshedToken = generateAccessToken(userToken);
    res.send({
      accessToken: refreshedToken,
    });
  });
  next();
};
module.exports = authenticateTokenRefresh;

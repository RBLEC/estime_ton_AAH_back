const jwt =require(`jsonwebtoken`);

const jwtSecret = process.env.JWT_SECRET;
const jwtTime = process.env.JWT_TIME;
const jwtSecretRefresh = process.env.JWT_SECRET_REFRESH;
const jwtTimeRefresh = process.env.JWT_TIME_REFRESH;

// Fonction qui génére un token
exports.generateAccessToken = (loginUser) => {
  return jwt.sign(loginUser, jwtSecret, { expiresIn: jwtTime });
};

// Fonction qui rafraichie un token pour un durée de un an
exports.generateRefreshToken=(loginUser)=> {
  return jwt.sign(loginUser, jwtSecretRefresh, { expiresIn: jwtTimeRefresh });
};

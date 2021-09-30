const sanitizer = require("sanitizer");

const sanitizeBody = (req, _, next) => {
  const bodyKeys = Object.keys(req.body);
  bodyKeys.forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizer.escape(req.body[key]);
    }
  });
  next();
};

module.exports = sanitizeBody;

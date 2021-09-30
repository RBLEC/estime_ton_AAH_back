// librairie
require(`dotenv`).config();
const express = require(`express`);
const cors = require(`cors`);
const router = require(`./app/router`);
const sanitizeBody = require(`./app/middlewares/sanitize`);

// vars
const app = express();
const port = process.env.PORT || 3000 ;

/* Middlewares  */
app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());
app.use(sanitizeBody);

app.use(router);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} 👍`);
});

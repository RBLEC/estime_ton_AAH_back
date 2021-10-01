const express = require(`express`);
const router = express.Router();

const path = require('path');

// importe nos controller
const userController = require(`./controllers/userController`);
const articleController = require(`./controllers/articleController`);
const commentController = require(`./controllers/commentController`);
const incomeController = require(`./controllers/incomeController`);

// importation du middleware
const authenticate = require(`./middlewares/authenticate`);
const authenticateRefresh = require(`./middlewares/authenticateRefresh`);
const admin = require(`./middlewares/admin`);

// CRUD User
router.post(`/signup`, userController.createUser);
router.post(`/login`, userController.loginUser);
router.post(`/refreshToken`, authenticateRefresh)
//router.post(`/logout`, authenticate, userController.logoutUser) //! pas besoin avec les JWT on ne peu pas les supprimés

router.get(`/users`,  authenticate, admin, userController.getUsers);
router.get(`/user/:id`, authenticate, userController.getUser);
router.patch(`/user/:id`, authenticate, userController.updateUser);
router.delete(`/user/:id`, authenticate, userController.deleteUser);

//* CRUD User Retail
//! Article
router.get(`/user/:userId/articles`, authenticate, articleController.getArticlesUser);
router.get(`/user/:userId/article/:articleId`, authenticate, articleController.getArticleUser);
router.post(`/user/:userId/article`, authenticate, articleController.createArticleUser);
router.patch(`/user/:userId/article/:articleId`, authenticate, articleController.updateArticleUser);
router.delete(`/user/:userId/article/:articleId`, authenticate, articleController.deleteArticleUser);

//! Comment
router.get(`/user/:userId/comments`, authenticate, commentController.getCommentsUser);
router.get(`/user/:userId/comment/:commentId`, authenticate, commentController.getCommentUser);
router.post(`/user/:userId/article/:articleId/comment`, authenticate, commentController.createCommentUser);
router.patch(`/user/:userId/comment/:commentId`, authenticate, commentController.updateCommentUser);
router.delete(`/user/:userId/comment/:commentId`, authenticate, commentController.deleteCommentUser);

//! Income
router.get(`/user/:userId/incomes`, authenticate, incomeController.getIncomesUser);
router.get(`/user/:userId/income/:incomeId`, authenticate, incomeController.getIncomeUser);
router.post(`/user/:userId/income`, authenticate, incomeController.createIncomeUser);
router.patch(`/user/:userId/income/:incomeId`, authenticate, incomeController.updateIncomeUser);
router.delete(`/user/:userId/income/:incomeId`, authenticate, incomeController.deleteIncomeUser);

//* CRUD Article
router.get(`/articles`, articleController.getArticles);
router.get(`/article/:id`, articleController.getArticle);

//* Count
router.get(`/articlesCount`, articleController.getCountArticles);
router.get(`/commentsCount`, commentController.getCountComments);
router.get(`/usersCount`, userController.getCountUsers);
router.get(`/incomesCount`, incomeController.getCountIncomes);

router.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get(`/api`, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Bienvenu sur le serveur Back 'Estime ton AAH !'`,
  });
});

// Middleware pour gérer le cas où on a trouvé aucune route (404)
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `🧨 Service does not exist !`,
  })
});

module.exports = router;

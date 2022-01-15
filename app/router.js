const express = require(`express`);
const router = express.Router();
const path = require('path');

// nodemailer
const sendMessage = require(`../nodemailer`);

// importe nos controller
const adminController = require(`./controllers/adminController`);
const userController = require(`./controllers/userController`);
const articleController = require(`./controllers/articleController`);
const guestbookController = require(`./controllers/guestbookController`);
const commentController = require(`./controllers/commentController`);
const infosimulationController = require(`./controllers/infosimulationController`);
const nbsimulationController = require(`./controllers/nbsimulationController`);
const apiExt = require('./controllers/apiExt');

// importation du middleware
const authenticate = require(`./middlewares/authenticate`);
const authenticateRefresh = require(`./middlewares/authenticateRefresh`);
const admin = require(`./middlewares/admin`);

//! admin
//* admin user
router.get(`/adminusers`, authenticate, admin, adminController.getAdminUsers); // =>ok
router.get(`/adminuser/:id`, authenticate, admin, adminController.getAdminUser); // =>ok
router.patch(`/adminuser/:id`, authenticate, admin, adminController.updateAdminUser); // =>ok
router.delete(`/adminuser/:id`, authenticate, admin, adminController.deleteAdminUser); // =>ok
//router.get(`/adminuser/:id/articles`, authenticate, admin, adminController.getAdminUserArticles); // =>ok //! a sup
//router.get(`/adminuser/:id/article/:id`, authenticate, admin, adminController.getAdminUserArticle); // =>ok //! a sup

//* comment admin
router.get(`/comments`, authenticate, admin, commentController.getComments); 
router.get(`/lastcomments`, authenticate, admin, commentController.getLastComments); 
router.get(`/comment/:id`, authenticate, admin, commentController.getComment); 
router.patch(`/comment/:id`, authenticate, admin, commentController.updateComment); 
router.delete(`/comment/:id`, authenticate, admin, commentController.deleteComment); 

//* Comment admin new
router.get(`/admincomments`, authenticate, admin, adminController.getAdminComments); 
router.get(`/admincomment/:id`, authenticate, admin, adminController.getAdminComment); 
router.patch(`/admincomment/:id`, authenticate, admin, adminController.updateAdminComment); 
router.delete(`/admincomment/:id`, authenticate, admin, adminController.deleteAdminComment); 

//* Article admin
router.get(`/adminarticles`, authenticate, admin, adminController.getAdminArticles); 
router.get(`/adminarticle/:id`, authenticate, admin, adminController.getAdminArticle); 
router.patch(`/adminarticle/:id`, authenticate, admin, adminController.updateAdminArticle); 
router.delete(`/adminarticle/:id`, authenticate, admin, adminController.deleteAdminArticle); 

//* Guestbook admin
router.get(`/adminguestbooks`, authenticate, admin, adminController.getAdminGuestbooks); 
router.get(`/adminguestbook/:id`, authenticate, admin, adminController.getAdminGuestbook); 
router.patch(`/adminguestbook/:id`, authenticate, admin, adminController.updateAdminGuestbook); 
router.delete(`/adminguestbook/:id`, authenticate, admin, adminController.deleteAdminGuestbook); 

//* Infosimulation admin
router.get(`/admininfosimulations`, authenticate, admin, adminController.getAdminInfosimulations); 
router.get(`/admininfosimulation/:id`, authenticate, admin, adminController.getAdminInfosimulation); 
//router.patch //! pas de mise à jour pour une simulation
router.delete(`/admininfosimulation/:id`, authenticate, admin, adminController.deleteAdminInfosimulation); 


//! CRUD User
router.post(`/signup`, userController.createUser); // =>ok
router.post(`/login`, userController.loginUser); // =>ok
router.post(`/refreshToken`, authenticateRefresh); // =>ok

router.get(`/user/:id`, authenticate, userController.getUser); // =>ok
router.get(`/userLastComment/:id`, authenticate, userController.getUserLastComment); // =>ok
router.get(`/userLastArticle/:id`, authenticate, userController.getUserLastArticle); // =>ok
router.get(`/userLastGuestbook/:id`, authenticate, userController.getUserLastGuestbook); // =>ok
router.get(`/userLastInfosimulation/:id`, authenticate, userController.getUserLastInfosimulation); // =>ok
router.patch(`/user/:id`, authenticate, userController.updateUser); // =>ok
router.delete(`/user/:id`, authenticate, userController.deleteUser); // =>ok

//* CRUD User Retail
//! Article
router.get(`/user/:userId/articles`,authenticate,articleController.getArticlesUser);
router.get(`/user/:userId/article/:articleId`,authenticate,articleController.getArticleUser);
router.post(`/user/:userId/article`,authenticate,articleController.createArticleUser);
router.patch(`/user/:userId/article/:articleId`,authenticate,articleController.updateArticleUser);
router.delete(`/user/:userId/article/:articleId`,authenticate,articleController.deleteArticleUser);

//! Livre d'or (guestbook)
router.get(`/user/:userId/guestbooks`,authenticate,guestbookController.getGuestbooksUser);
router.get(`/user/:userId/guestbook/:guestbookId`,authenticate,guestbookController.getGuestbookUser);
router.post(`/user/:userId/guestbook`,authenticate,guestbookController.createGuestbookUser);
router.patch(`/user/:userId/guestbook/:guestbookId`,authenticate,guestbookController.updateGuestbookUser);
router.delete(`/user/:userId/guestbook/:guestbookId`,authenticate,guestbookController.deleteGuestbookUser);

//! Comment
router.get(`/user/:userId/comments`,authenticate,commentController.getCommentsUser);
router.get(`/user/:userId/comment/:commentId`,authenticate,commentController.getCommentUser);
router.post(`/user/:userId/article/:articleId/comment`,authenticate,commentController.createCommentArticleUser);
router.post(`/user/:userId/guestbook/:guestbookId/comment`,authenticate,admin,commentController.createCommentGuestbookUser);
router.patch(`/user/:userId/comment/:commentId`,authenticate,commentController.updateCommentUser);
router.delete(`/user/:userId/comment/:commentId`,authenticate,commentController.deleteCommentUser);

//! infosimulation
router.get(`/user/:userId/infosimulations`,authenticate,infosimulationController.getInfosimulationsUser);
router.get(`/user/:userId/infosimulation/:infosimulationId`,authenticate,infosimulationController.getInfosimulationUser);
router.post(`/user/:userId/infosimulation`,authenticate,infosimulationController.createInfosimulationUser);
//router.patch //! pas de mise à jour pour une simulation
router.delete(`/user/:userId/infosimulation/:infosimulationId`,authenticate,infosimulationController.deleteInfosimulationUser);

//! Lecture Article
router.get(`/articles`, articleController.getArticles); // =>ok
router.get(`/lastarticles`, articleController.getLastArticles); // =>ok
router.get(`/article/:id`, articleController.getArticle); // =>ok

//! Lecture Livre d'or
router.get(`/guestbooks`, guestbookController.getGuestbooks); // =>ok
router.get(`/lastguestbooks`, guestbookController.getLastGuestbooks); // =>ok
router.get(`/guestbook/:id`, guestbookController.getGuestbook); // =>ok

//! Création d'une simulation
router.get(`/nbsimulations`,authenticate,admin,nbsimulationController.getNbsimulations); // =>ok
router.get(`/user/:userId/nbsimulations`,authenticate,nbsimulationController.getNbsimulationsUser); // =>ok

//! Count
router.get(`/countarticles`, articleController.getCountArticles);
router.get(`/countguestbooks`, guestbookController.getCountGuestbooks);
router.get(`/countcomments`, commentController.getCountComments);
router.get(`/countusers`, userController.getCountUsers);
router.get(`/countnbsimulations`, nbsimulationController.getCountNbsimulations);

//! Openfisca
router.get(`/apiext/aah`, apiExt.getAAH);
router.get(`/apiext/majorationPlafondCouple`, apiExt.getMajorationPlafondCouple);
router.get(`/apiext/coefPersonneACharge`, apiExt.getCoefPersonneACharge);
router.get(`/apiext/smichb`, apiExt.getSmichb);
router.get(`/apiext/smichbtf`, apiExt.getSmichbtf);
router.get(`/apiext/mva`, apiExt.getMVA);
router.get(`/apiext/ageMinimal`, apiExt.getAgeMinimal);
router.get(`/apiext/ageRetraite`, apiExt.getAgeRetraite);
router.get(`/apiext/tauxInvalidite`, apiExt.getTauxInvalidite);
router.get(`/apiext/tauxInvaliditeMinimum`, apiExt.getTauxInvaliditeMinimum);

//! Nodemailer
router.post(`/send_message`, sendMessage);

//! accueil
router.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get(`/api`, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Bienvenu sur le serveur Back 'Estime ton AAH !' `,
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

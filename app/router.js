const express = require(`express`);
const router = express.Router();
const path = require('path');
const axios = require('axios')

// nodemailer
const sendMessage = require(`../nodemailer`);

// importe nos controller
const userController = require(`./controllers/userController`);
const articleController = require(`./controllers/articleController`);
const guestbookController = require(`./controllers/guestbookController`);
const commentController = require(`./controllers/commentController`);
const infosimulationController = require(`./controllers/infosimulationController`);
const nbsimulationController = require(`./controllers/nbsimulationController`);

// importation du middleware
const authenticate = require(`./middlewares/authenticate`);
const authenticateRefresh = require(`./middlewares/authenticateRefresh`);
const admin = require(`./middlewares/admin`);

//! CRUD User
router.post(`/signup`, userController.createUser); // =>ok
router.post(`/login`, userController.loginUser); // =>ok
router.post(`/refreshToken`, authenticateRefresh); // =>ok
//router.post //! pas besoin avec les JWT on ne peu pas les supprimés

router.get(`/users`, authenticate, admin, userController.getUsers); // =>ok
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

//! Creation d'une simulation
router.get(`/nbsimulations`,authenticate,admin,nbsimulationController.getNbsimulations); // =>ok
router.get(`/user/:userId/nbsimulations`,authenticate,nbsimulationController.getNbsimulationsUser); // =>ok

//! Count
router.get(`/countarticles`, articleController.getCountArticles);
router.get(`/countguestbooks`, guestbookController.getCountGuestbooks);
router.get(`/countcomments`, commentController.getCountComments);
router.get(`/countusers`, userController.getCountUsers);
router.get(`/countnbsimulations`, nbsimulationController.getCountNbsimulations);

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

//! OpenFisca
// Le montant de l'AAH
router.get(`/aahMontant`, async (req, res) => {
  await axios
  .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.montant")
  .then(res =>{
    aahMontant= res.data.values;
    aahDescription= res.data.description;
    console.log(`nbs`, aahMontant);
    console.log(`res`, res);
  })
  res.status(200).json({
  success: true,
  aahDescription,
  aahMontant,
  });
});

// majoration_plafond_couple
router.get(`/majorationPlafondCouple`, async (req, res) => {
  await axios
  .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majoration_plafond_couple")
  .then(res =>{
    majorationPlafondCoupleCoef= res.data.values;
    majorationPlafondCoupleDescription= res.data.description;
  })
  res.status(200).json({
  success: true,
  majorationPlafondCoupleDescription,
  majorationPlafondCoupleCoef,
  });
});

// coefPersonneACharge
router.get(`/coefPersonneACharge`, async (req, res) => {
  await axios
  .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majoration_plafond_personne_a_charge")
  .then(res =>{
    coefPersonneACharge= res.data.values;
    coefPersonneAChargeDescription= res.data.description;
  })
  res.status(200).json({
  success: true,
  coefPersonneAChargeDescription,
  coefPersonneACharge,
  });
});

// smichb
router.get(`/smichb`, async (req, res) => {
  await axios
  .get("https://fr.openfisca.org/api/latest/parameter/marche_travail.salaire_minimum.smic_h_b")
  .then(res =>{
    smichb= res.data.values;
    smichbDescription= res.data.description;
  })
  res.status(200).json({
  success: true,
  smichbDescription,
  smichb,
  });
});

// smichbtf
router.get(`/smichbtf`, async (req, res) => {
  await axios
  .get("https://fr.openfisca.org/api/latest/parameter/marche_travail.salaire_minimum.nb_heure_travail_mensuel")
  .then(res =>{
    smichbtf= res.data.values;
    smichbtfDescription= res.data.description;
  })
  res.status(200).json({
  success: true,
  smichbtfDescription,
  smichbtf,
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

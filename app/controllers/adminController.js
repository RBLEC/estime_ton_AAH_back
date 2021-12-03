const { User, Article } = require(`../models`);
const {generateAccessToken,generateRefreshToken }= require(`../middlewares/jwt`);
const bcrypt = require("bcrypt");

const dateTime = require("../middlewares/date");

//* liste de tous les utilisateurs
exports.getAdminUsers = async (req, res) => {
  // J`utilise sequelize pour récupérer l`ensemble des listes
  await User.findAndCountAll({
    order: [[`pseudo`]],
  })
    .then((users) => {
      // dans le then (lorsque sequelize à enfin récupéré les listes) j`envoi les lites au client.
      // je répond en JSON car je suis une API
      res.status(200).json({
        success: true,
        message: `Voici la liste de tous les utilisateurs par pseudo`,
        users,
      });
    })
    .catch((error) => {
      // si sequelize à eu une erreur je revoi un message au client ne JSON pour lui dire qu`il y a un pépin
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec la liste de tous les utilisateurs, veuillez vous connecter.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses infos
exports.getAdminUser = async (req, res) => {
  const urlId = parseInt(req.params.id, 10);
  await User.findAll( { 
    where: id =  parseInt(urlId),
    }).then((user) => {
      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Toutes les informations de l'utilisateur`,
        user
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec les informations de l'utilisateur.`,
        error: error.message,
      });
    });
};

//* Suppréssion d'un utilisateur
exports.deleteAdminUser = async (req, res) => {
  const userId = userToken.id
  await User.findByPk(userId)
    .then((user) => {
      return user.destroy();
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: `L'utilisateur a été effacé`,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `L'utilisateur n'a pas été effacé`,
        error: error.message,
      });
    });
};

//* Mise à jour d'un utilisateur
exports.updateAdminUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userToken.pseudo !== req.body.pseudo ) {
    const userExist = await User.findOne({
      where: { pseudo: req.body.pseudo },
    });
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    pseudo: req.body.pseudo,
    password: hashPassword,
    email: req.body.email,
    author: req.body.author,
    role: req.body.role,
    status: req.body.status,
  };
  //* je récupère le user à modifier
  await User.findByPk(userId)
    .then((user) => {
      return user.update(userData);
    })
    .then((user) => {
      // lorsque le mise à jours est terminée je renvoi au client la user modifiée
      const userWOPW = {
      pseudo: user.dataValues.pseudo,
      email: user.dataValues.email,
      author: user.dataValues.author,
      role: user.dataValues.role,
      status: req.body.status,
      };
    const accessToken = generateAccessToken(userWOPW);
    const refreshToken = generateRefreshToken(userWOPW);
      res.status(200).json({
        success: true,
        message: `Utilisateur mis à jour.`,
        userWOPW,
        accessToken,
        refreshToken
      });
    })
    .catch((error) => {
      console.trace(error);
      // si sequelize à eu une erreur je revoi un message au client ne JSON pour lui dire qu`il y a un pépin
      res.status(500).json({
        success: false,
        message: `L'utilisateur n'a pas été mis à jour.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses articles
exports.getAdminUserArticles = async (req, res) => {
  const urlId = parseInt(req.params.id, 10);
  await User.findAndCountAll( { 
    where: id =  parseInt(urlId),
      //include:['article', 'guestbook','comment','infosimulation']
      include: 'article',
      order: [[model = 'article',"updated_at", "DESC",]],
    }).then((user) => {

      console.log(`user`, user)

      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Toutes les informations de l'utilisateur`,
        user
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec les informations de l'utilisateur.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec un article
exports.getAdminUserArticle = async (req, res) => {
  const articleId = parseInt(req.params.id, 10);
    await Article.findAll({
      where: id = articleId, 
        include: ['user','comment'], 
    }).then((article) => {
      if(!article) {
        throw new Error(`Article non trouvé`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici l'article`),
          article
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour lister l'article`),
          error: error.message
        });
    });
  };


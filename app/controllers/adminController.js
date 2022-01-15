const { 
  User, 
  Article, 
  Comment, 
  Guestbook, 
  Infosimulation, 
  Nbsimulation 
} = require(`../models`);
const {generateAccessToken,generateRefreshToken }= require(`../middlewares/jwt`);
const bcrypt = require("bcrypt");

const dateTime = require("../middlewares/date");

//! Admin User
//* liste de tous les utilisateurs
exports.getAdminUsers = async (req, res) => {
  // J`utilise sequelize pour récupérer l`ensemble des listes
  await User.findAndCountAll({
    order: [[`pseudo`]],
  })
    .then((users) => {
      // dans le then (lorsque sequelize à enfin récupéré les listes) j`envoie la liste au client.
      // je réponds en JSON car je suis une API
      res.status(200).json({
        success: true,
        message: `Voici la liste de tous les utilisateurs par pseudo`,
        users,
      });
    })
    .catch((error) => {
      // si sequelize a eu une erreur je renvoie un message au client en JSON pour lui dire qu`il y a un pépin
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

//* Suppression d'un utilisateur
exports.deleteAdminUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
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
      // lorsque la mise à jours est terminéee je renvoie au client le user modifié
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
        message: `L'utilisateur a été mis à jour.`,
        userWOPW,
        accessToken,
        refreshToken
      });
    })
    .catch((error) => {
      console.trace(error);
      // si sequelize a eu une erreur je renvoie un message au client en JSON pour lui dire qu`il y a un pépin
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
        throw new Error(`Utilisateur non trouvé.`);
      }
      res.status(200).json({
        success: true,
        message: `Toutes les informations de l'utilisateur.`,
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
        throw new Error(`Article non trouvé.`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici l'article.`),
          article
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour afficher l'article.`),
          error: error.message
        });
    });
  };

//! Admin Comment
  // Liste tous les  commentaires par ordre de création desc
  exports.getAdminComments = async (req, res) => {
    await Comment.findAndCountAll( {
      include: [
        'user',`article`, 'guestbook', {
        association: `article` ,
        include: "user"
      },{
        association: `guestbook` ,
        include: "user"
      }],
      order: [[`created_at`, `DESC`]],           
    }).then(comments => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de tous les commentaires.`),
        comments
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de tous les commentaires.`),
      error: error.message
      });
    });
  };

  // Liste un commentaire
  exports.getAdminComment = async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    await Comment.findAndCountAll({
      where: id = commentId, 
      include: [
        'user',`article`, 'guestbook', {
        association: `article` ,
        include: "user"
      },{
        association: `guestbook` ,
        include: "user"
      }],
    }).then((comment) => {
      if(!comment) {
        throw new Error(`Commentaire non trouvé.`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici le commentaire.`),
          comment
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour afficher le commentaire.`),
          error: error.message
        });
    });
  };

  // Supression de l'article de l'utilisateur
  exports.deleteAdminComment = async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
      await Comment.findByPk(commentId)
      .then(comment => {  
      if(!comment) {
        throw new Error(`Commentaire non trouvé.`);
      }
      return comment.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Commentaire effacé.`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le commentaire n'a pas été effacé.`),
        error: error.message
      });
    });
  };

    // Mise à jour de l'article de l'utilisateur
  exports.updateAdminComment = async (req, res) => {
    const commentData = {
      content : req.body.content,
      user_id : req.body.user_id,
      article_id : req.body.article_id,
      guestbook_id : req.body.guestbook_id
    } ;
    const commentId = parseInt(req.params.id, 10);
    await Comment.findByPk(commentId)
    .then(comment => {
      if(!comment) {
        throw new Error(`Commentaire non trouvé.`);
      }
      return comment.update(commentData);           
    }).then((comment) => {
      res.status(200).json({
        success: true,
        message: (`Commentaire mis à jour.`),
        comment
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: (`Le commentaire n'a pas été mis à jour.`),
        error: error.message
      });
    });
  };

  //! Admin Article
  // Liste tous les  articles par ordre de création desc
  exports.getAdminArticles = async (req, res) => {
    await Article.findAndCountAll( {
      include: {
        association: `user`
      },
      order: [[`created_at`, `DESC`]],           
    }).then(articles => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de tous les articles.`),
        articles
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de tous les articles.`),
      error: error.message
      });
    });
  };

  // Affiche un article
  exports.getAdminArticle = async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    await Article.findAndCountAll({
      where: id = articleId, 
      include: {
        association: `user`
      },
    }).then((article) => {
      if(!article) {
        throw new Error(`Article non trouvé.`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici l'article.`),
          article
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour afficher l'article.`),
          error: error.message
        });
    });
  };

  // Suppression de l'article 
  exports.deleteAdminArticle = async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
      await Article.findByPk(articleId)
      .then(article => {  
      if(!article) {
        throw new Error(`Article non trouvé`);
      }
      return article.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Article effacé.`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`L'article n'a pas été effacé.`),
        error: error.message
      });
    });
  };

    // Mise à jour de l'article 
  exports.updateAdminArticle = async (req, res) => {
    const articleData = {
      title : req.body.title,
      content : req.body.content,
      user_id : req.body.user_id
    } ;
    const articleId = parseInt(req.params.id, 10);
    await Article.findByPk(articleId)
    .then(article => {
      if(!article) {
        throw new Error(`ARticle non trouvé.`);
      }
      return article.update(articleData);           
    }).then((article) => {
      res.status(200).json({
        success: true,
        message: (`article mis à jour.`),
        article
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: (`L'article n'a pas été mis à jour.`),
        error: error.message
      });
    });
  };

//! Admin Guestbook
  // Liste tous les  messages du livre d'or par ordre de création desc
  exports.getAdminGuestbooks = async (req, res) => {
    await Guestbook.findAndCountAll( {
      include: {
        association: `user`
      },
      order: [[`created_at`, `DESC`]],           
    }).then(guestbooks => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de tous les  messages du livre d'or.`),
        guestbooks
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de tous les  messages du livre d'or.`),
      error: error.message
      });
    });
  };

  // Affiche un message du livre d'or
  exports.getAdminGuestbook = async (req, res) => {
    const guestbookId = parseInt(req.params.id, 10);
    await Guestbook.findAndCountAll({
      where: id = guestbookId, 
      include: {
        association: `user`
      },
    }).then((guestbook) => {
      if(!guestbook) {
        throw new Error(`Message du livre d'or non trouvé.`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici le  message du livre d'or.`),
          guestbook
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour afficher le  message du livre d'or.`),
          error: error.message
        });
    });
  };

  // Suppression du  message du livre d'or
  exports.deleteAdminGuestbook = async (req, res) => {
    const guestbookId = parseInt(req.params.id, 10);
      await Guestbook.findByPk(guestbookId)
      .then(guestbook => {  
      if(!guestbook) {
        throw new Error(`Message dans le livre d'or non trouvé.`);
      }
      return guestbook.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Message dans le livre d'or effacé.`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le message dans le livre d'or n'a pas été effacé.`),
        error: error.message
      });
    });
  };

    // Mise à jour d'un message dans le livre d'or
  exports.updateAdminGuestbook = async (req, res) => {
    const guestbookData = {
      title : req.body.title,
      content : req.body.content,
      user_id : req.body.user_id
    } ;
    const guestbookId = parseInt(req.params.id, 10);
    await Guestbook.findByPk(guestbookId)
    .then(guestbook => {
      if(!guestbook) {
        throw new Error(`Message dans le livre d'or non trouvé.`);
      }
      return guestbook.update(guestbookData);           
    }).then((guestbook) => {
      res.status(200).json({
        success: true,
        message: (`Le message dans le livre d'or à été mis à jour.`),
        guestbook
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: (`Le message dans le livre d'or n'a pas été mis à jour.`),
        error: error.message
      });
    });
  };
  
//! Admin Infosimulation
  // Liste tous les  infosimulations par ordre de création desc
  exports.getAdminInfosimulations = async (req, res) => {
    await Infosimulation.findAndCountAll( {
      include: {
        association: `user`
      },
      order: [[`created_at`, `DESC`]],           
    }).then(infosimulations => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de toutes les simulations.`),
        infosimulations
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de toutes les simulations.`),
      error: error.message
      });
    });
  };

  // Liste un message une infosimulation
  exports.getAdminInfosimulation = async (req, res) => {
    const infosimulationId = parseInt(req.params.id, 10);
    await Infosimulation.findAndCountAll({
      where: id = infosimulationId, 
      include: {
        association: `user`
      },
    }).then((infosimulation) => {
      if(!infosimulation) {
        throw new Error(`Infosimulation non trouvée.`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici l'infosimulation.`),
          infosimulation
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour lister l'infosimulation.`),
          error: error.message
        });
    });
  };

  // Supression d'une infosimulation
  exports.deleteAdminInfosimulation = async (req, res) => {
    const infosimulationId = parseInt(req.params.id, 10);
      await Infosimulation.findByPk(infosimulationId)
      .then(infosimulation => {  
      if(!infosimulation) {
        throw new Error(`Infosimulation non trouvée.`);
      }
      return infosimulation.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Infosimulation effacée.`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`L'infosimulation n'a pas été effacée.`),
        error: error.message
      });
    });
  };


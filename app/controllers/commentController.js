const { Comment, User } = require(`../models`);

  // Liste tous les commentaires de l'utilisateur
  exports.getCommentsUser= (req, res) => {
    const userId = userToken.id
    User.findByPk(userId, {
      include: `comment`, 
    }).then((user) => {
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }   
      res.status(200).json({
        success: true,
        message:(`Voici la liste de tous les commentaires de l'utilisateur`),
        user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème avec la listes de tous les commentaires de l'utilisateur`),
        error: error.message
      });
    });
  };

  // liste un commentaire et l'article
  exports.getCommentUser= (req, res) => {
    const userId = userToken.id
    const commentId = parseInt(req.params.commentId, 10);
    Promise.all([
      User.findByPk(userId),
      Comment.findByPk(commentId, {
        include: `article`,
      })
    ]).then(values => {
      [user, comment] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!comment) {
        throw new Error(`Commentaire non trouvé`);
      }
      if(comment.user_id !== user.id) {
        throw new Error(`commentaire de l'utilisateur non touvé`);
      }
      return (user, comment);
    }).then(() => {
      res.status(200).json({
        message:(`Voici la liste de tous les messages de l'utilisateur`),
        success: true,
        user, comment
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    });
  };

  // Création d'un commentaires
  exports.createCommentUser= (req, res) => {
    const userId = userToken.id
    const articleId = parseInt(req.params.articleId, 10);
    const { content} = req.body;
    let missingParams =[];
    if (!content) {
      missingParams.push(`commentaire`);  
    }
    if (missingParams.length > 0) {
      return res.status(400).json(`Il manque votre ${missingParams.join(`, `)}`);
    }
    User.findByPk(userId),    
    Comment.create({
      content: req.body.content,
      user_id: userId,
      article_id: articleId
    }).then(comment => {
      res.status(201).json({
        success: true,
        message: (`Commentaire créer`),
        comment,
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Oups commentaire non créer`),
        error: error.message
      });
    });      
  };

  // supression d'un commentaire de l'utilisateur
  exports.deleteCommentUser= (req, res) => {
    const userId = userToken.id
    const commentId = parseInt(req.params.commentId, 10);
    Promise.all([
      User.findByPk(userId),
      Comment.findByPk(commentId)
    ]).then(values => {
      [user, comment] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!comment) {
        throw new Error(`Commentaire non trouvé`);
      }
      if(comment.user_id !== userId) {
        throw new Error(`Commentaire de l'utilisateur non trouvé`);
      }
      return comment.destroy();
    }).then(() => {
      res.json({
        success: true,
        message: (`commentaire effacé`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: (`commentaire non effacé`)
      });
    });
  };

  // Mise à jour d'un commentaire de L'utilisateur
  exports.updateCommentUser= (req, res) => {
    const commentData = req.body;
    const commentId = parseInt(req.params.commentId, 10);
    const userId = userToken.id
    const {content} = req.body;
    let missingParams =[ ];
    if (!content) {
      missingParams.push(`commentaire`);  
    }
    if (missingParams.length > 0) {
      return res.status(400).json(`Il manque votre ${missingParams.join(`,  `)}`);
    }
    Promise.all ([
      User.findByPk(userId), 
      Comment.findByPk(commentId)
    ]).then(values => {
      [user, comment] = values;
      if(!comment) {
        throw new Error(`commentaire non trouvé`);
      }
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(commentData.user_id !== user.id) {
        throw new Error(`Commentaire de l'utilisateur non trouvé`);
      }
      return comment.update(content, user);
    }).then(comment => {
      res.json({
        success: true,
        message: (`Commentaire mis à jour`),
        comment
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le commentaire n'a pas été mis à jour`),
        error: error.message
      });
    });   
  };

  // compteur du nombre de commentaire enregister
  exports.getCountComments= (req, res) => {
    Comment.count().then(comments => {
      res.status(200).json({
        success: true,
        message: (`Voici le nombre total de commentaire => ${comments}`),
        comments
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`impossible de compter le nombre de commentaire`),
        error: error.message
      });
    });
  };


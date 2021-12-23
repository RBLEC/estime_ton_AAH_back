const { Comment, User } = require(`../models`);

  // Liste tous les commentaires de l'utilisateur
  exports.getCommentsUser = async (req, res) => {
    const userId = userToken.id
    await User.findAndCountAll( { 
        // Par id user et par mise a jour du commentaire
        where: id = userId,
        include:[
          model = 'comment', 
          
        ],
        //association: `user`,
        order:[[
          model = 'comment',
          "updated_at", "DESC",
        ]],
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
  exports.getCommentUser = async (req, res) => {
    const userId = userToken.id
    const commentId = parseInt(req.params.commentId, 10);
    await Promise.all([
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

  // Création d'un commentaire pour un article
  exports.createCommentArticleUser = async (req, res) => {
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
    await Promise.all([
      User.findByPk(userId),    
      Comment.create({
        content: req.body.content,
        user_id: userId,
        article_id: articleId
      })
    ])
    .then(values => {
      [user, comment] = values;
    })
    .then(() => {
      res.status(201).json({
        success: true,
        message: (`Commentaire créer`),
        comment,
        user
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

    // Création d'un commentaire pour le livre d'or
  exports.createCommentGuestbookUser = async (req, res) => {
    const userId = userToken.id
    const guestbookId = parseInt(req.params.guestbookId, 10);
    const { content} = req.body;
    let missingParams =[];
    if (!content) {
      missingParams.push(`commentaire`);  
    }
    if (missingParams.length > 0) {
      return res.status(400).json(`Il manque votre ${missingParams.join(`, `)}`);
    }
    await Promise.all([
      User.findByPk(userId),    
      Comment.create({
        content: req.body.content,
        user_id: userId,
        guestbook_id: guestbookId
      })
    ])
    .then(values => {
      [user, comment] = values;
    })
    .then(() => {
      res.status(201).json({
        success: true,
        message: (`Commentaire créer`),
        comment,
        user
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
  exports.deleteCommentUser = async (req, res) => {
    const userId = userToken.id
    const commentId = parseInt(req.params.commentId, 10);
    await Promise.all([
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
  exports.updateCommentUser = async (req, res) => {
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
    await Promise.all ([
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
  exports.getCountComments= async (req, res) => {
    await Comment.count().then(comments => {
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

  // Liste tous les  commentaires par ordre de création desc
  exports.getComments = async (req, res) => {
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
        message:(`Voici la liste de tous les commentaires`),
        comments
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de tous les commentaires`),
      error: error.message
      });
    });
  };

    // les 10 derniers commentaires
  exports.getLastComments = async (req, res) => {
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
      limit:10,
      subQuery: false,    
    }).then(comments => {
      res.status(200).json({
        success: true,
        message:(`Voici des 10 derniers commentaires`),
        comments
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec les 10 derniers commentaires`),
      error: error.message
      });
    });
  };

    // Liste un commentaire
  exports.getComment = async (req, res) => {
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
        throw new Error(`Commentaire non trouvé`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici le commentaire`),
          comment
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour lister le commentaire`),
          error: error.message
        });
    });
  };
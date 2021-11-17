const { Guestbook, User } = require(`../models`);

  // Liste tous les articles avec les commentaires par ordre de création desc
  exports.getGuestbooks = async (req, res) => {
    await Guestbook.findAndCountAll( { 
      include: {
        association: `user`
      },
      order:[["updated_at", "DESC"]],
    }).then(guestbooks => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de tous les messages du livre d'or`),
        guestbooks
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de tous les messages du livre d'or`),
      error: error.message
      });
    });
  };

  // les 10 derniers messages du livre d'or
  exports.getLastGuestbooks = async (req, res) => {
    await Guestbook.findAndCountAll( {
      include: {
        association: `user`
      },
      order: [[`created_at`, `DESC`]], 
      offset: 5,
      limit:10,
      subQuery: false,    
    }).then(guestbooks => {
      res.status(200).json({
        success: true,
        message:(`Voici des 10 derniers message du livre d'or`),
        guestbooks
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec les 10 derniers  message du livre d'or`),
      error: error.message
      });
    });
  };

  // Liste un message du livre d'or avec ses commentaires
  exports.getGuestbook = async (req, res) => {
    const guestbookId = parseInt(req.params.id, 10);
    await Guestbook.findByPk(guestbookId, {
      include: `comment`,
      include: {
        association: `user`
      },
    }).then((guestbook) => {
      if(!guestbook) {
        throw new Error(`Message du livre d'or non trouvé`);
      }
      res.status(200).json({
          success: true,
          message:(`Voici le message du livre d'or`),
          guestbook
      });
    }).catch(error => {
      console.trace(error);
        res.status(500).json({
          success: false,
          message:(`Oups il y a un problème pour lister le message du livre d'or`),
          error: error.message
        });
    });
  };

  // Listes tous les messages du livre d'or de l'utilisateur
  exports.getGuestbooksUser = async (req, res) => {
    const userId = userToken.id
    await User.findAndCountAll( { 
        where: id = userId,
        include: [model = 'guestbook', ],
        order: [[ model = 'guestbook',"updated_at", "DESC",]],
    }).then((user) => {
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message:(`Voici tous les messages du livre d'or de l'utilisateur`),
        user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème pour lister de tous les messages du livre d'or de l'utilisateur`),
        error: error.message
      });
    });
  };

  // Liste un messages du livre d'or d'un utilisateur
  exports.getGuestbookUser = async (req, res) => {
    const userId = userToken.id
    const guestbookId = parseInt(req.params.guestbookId, 10);
    await Promise.all([
      User.findByPk(userId),
      Guestbook.findByPk(guestbookId, {
        include: `comment`,
      })
    ]).then(values => {
      [user, guestbook] = values;
        if(!user) {
          throw new Error(`Utilisateur non trouvé`);
        }
        if(!guestbook) {
          throw new Error(`Message non trouvé`);
        }
        if(guestbook.user_id !== user.id) {
          throw new Error(`Message de l'utilisateur non trouvé`);
        }
        return (user, guestbook);
    }).then(() => {
      res.status(200).json({
        success: true,
        message:(`Message de l'utilisateur`),
        guestbook
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème avec le message de l'utilisateur`),
        error: error.message
      });
    });
  };

  // création d'un messages du livre d'or de l'utilisateur
  exports.createGuestbookUser = async (req, res) => {
    const userId = userToken.id
    const {title, content} = req.body;
    let missingParams =[];
    if (!title) {
      missingParams.push(`le titre`);
    }
    if (!content) {
      missingParams.push(`le contenu`);
    }
    if (missingParams.length > 0) {
      return res.status(400).json(`Il manque des paramètres: ${missingParams.join(`, `)}`);
    }
    await User.findByPk(userId),   
    await Guestbook.create({
      title: req.body.title,
      content: req.body.content,
      user_id: userId 
    }).then(guestbook => {
      res.status(201).json({
        success: true,
        message: (`Votre message dans le livre d'or a été créer`),
        guestbook,
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Votre message dans le livre d'or n'a pas été créer`),
        error: error.message
      });
    });
  };

  // Suppresion d'un messages du livre d'or de l'utilisateur
  exports.deleteGuestbookUser = async (req, res) => {
    const userId = userToken.id
    const guestbookId = parseInt(req.params.guestbookId, 10);
    await Promise.all([
      User.findByPk(userId),
      Guestbook.findByPk(guestbookId)
    ]).then(values => {
      [user, guestbook] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!guestbook) {
        throw new Error(`Message dans le livre d'or non trouvé`);
      }
      if(guestbook.user_id !== userId) {
        throw new Error(`Message dans le livre d'or de l'utilisateur non trouvé`);
      }
      return guestbook.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Message dans le livre d'or effacé`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le message dans le livre d'or n'a pas été effacé`),
        error: error.message
      });
    });
  };

  // Mise a jour d'un messages du livre d'or de l'utilisateur
  exports.updateGuestbookUser = async (req, res) => {
    const guestbookData = req.body;
    const userId = userToken.id
    const guestbookId = parseInt(req.params.guestbookId, 10);
    await Promise.all ([
      User.findByPk(userId), 
      Guestbook.findByPk(guestbookId)
    ]).then(values => {
      [user, guestbook] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!guestbook) {
        throw new Error(`Message dans le livre d'or non trouvé`);
      }
      if(guestbook.user_id !== userId) {
        throw new Error(`Message dans le livre d'or de l'utilisateur non trouvé`);
      }
      return guestbook.update(guestbookData, user);           
    }).then( () => {
      res.status(200).json({
        success: true,
        message: (`Message dans le livre d'or mis à jour`),
        guestbook
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le message dans le livre d'or n'a pas été mis à jour`),
        error: error.message
      });
    });
  };

  // compteur du nombre de message du livre d'or 
  exports.getCountGuestbooks = async (req, res) => {
    await Guestbook.count().then(guestbooks => {
      res.status(200).json({
        success: true,
        message: (`Voici le nombre total de message dans le livre d'or => ${guestbooks}`),
        guestbooks
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`impossible de compter le nombre de message dans le livre d'or`),
        error: error.message
      });
    });
  };

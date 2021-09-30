const { Article, User } = require(`../models`);

  // Liste tous les articles avec les commentaires par ordre de création desc
  exports.getArticles = (req, res) => {
    Article.findAll({
      include: {
        association: `comment`
      },
      order: [
        [`created_at`, `DESC`]
      ]           
    }).then(articles => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de tous les articles`),
        articles
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de tous les articles`),
      error: error.message
      });
    });
  };

  // Liste un article avec ses commentaires
  exports.getArticle = (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    Article.findByPk(articleId, {
      include: `comment`
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

  // Liste tous les articles d`un utilisateur 
  exports.getArticlesUser = (req, res) => {
    const userId = userToken.id
    User.findByPk(userId, {
      include: `article`, 
    }).then((user) => {
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message:(`Voici tous les articles de l'utilisateur`),
        user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème pour lister de tous les articles de l'utilisateur`),
        error: error.message
      });
    });
  };

  // Liste un article d'un utilisateur
  exports.getArticleUser = (req, res) => {
    const userId = userToken.id
    const articleId = parseInt(req.params.articleId, 10);
    Promise.all([
      User.findByPk(userId),
      Article.findByPk(articleId, {
        include: `comment`,
      })
    ]).then(values => {
      [user, article] = values;
        if(!user) {
          throw new Error(`Utilisateur non trouvé`);
        }
        if(!article) {
          throw new Error(`Article non trouvé`);
        }
        if(article.user_id !== user.id) {
          throw new Error(`Article de l'utilisateur non trouvé`);
        }
        return (user, article);
    }).then(() => {
      res.status(200).json({
        success: true,
        message:(`l'article de l'utilisateur`),
        article
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème avec l'article de l'utilisateur`),
        error: error.message
      });
    });
  };

  // création d'un article de l'utilisateur
  exports.createArticleUser = (req, res) => {
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
    User.findByPk(userId),   
    Article.create({
      title: req.body.title,
      content: req.body.content,
      user_id: userId 
    }).then(article => {
      res.status(201).json({
        success: true,
        message: (`Votre article a été créer`),
        article,
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Votre article n'a pas été créer`),
        error: error.message
      });
    });
  };

  // Suppresion de l'article de l'utilisateur
  exports.deleteArticleUser = (req, res) => {
    const userId = userToken.id
    const articleId = parseInt(req.params.articleId, 10);
    Promise.all([
      User.findByPk(userId),
      Article.findByPk(articleId)
    ]).then(values => {
      [user, article] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!article) {
        throw new Error(`Article non trouvé`);
      }
      if(article.user_id !== userId) {
        throw new Error(`Article de l'utilisateur non trouvé`);
      }
      return article.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Article effacé`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`L'article n'a pas été effacé`),
        error: error.message
      });
    });
  };

  // Mise a jour de l'article de l'utilisateur
  exports.updateArticleUser = (req, res) => {
    const articleData = req.body;
    const userId = userToken.id
    const articleId = parseInt(req.params.articleId, 10);
    Promise.all ([
      User.findByPk(userId), 
      Article.findByPk(articleId)
    ]).then(values => {
      [user, article] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!article) {
        throw new Error(`Article non trouvé`);
      }
      if(article.user_id !== userId) {
        throw new Error(`Article de l'utilisateur non trouvé`);
      }
      return article.update(articleData, user);           
    }).then( () => {
      res.status(200).json({
        success: true,
        message: (`Article mis à jour`),
        article, user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`L'article n'a pas été mis à jour`),
        error: error.message
      });
    });
  };

  // compteur du nombre d`article enregister
  exports.getCountArticles = (req, res) => {
    Article.count().then(articles => {
      res.status(200).json({
        success: true,
        message: (`Voici le nombre total d'articles => ${articles}`),
        articles
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`impossible de compter le nombre d'article`),
        error: error.message
      });
    });
  };

const { Article, User } = require(`../models`);

  // Liste tous les articles avec les commentaires par ordre de création desc
  exports.getArticles = async (req, res) => {
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

  // les 10 derniers articles
  exports.getLastArticles = async (req, res) => {
    await Article.findAndCountAll( {
      include: {
        association: `user`
      },
      order: [[`created_at`, `DESC`]], 
      limit:10,
      subQuery: false,    
    }).then(articles => {
      res.status(200).json({
        success: true,
        message:(`Voici des 10 derniers articles.`),
        articles
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec les 10 derniers articles.`),
      error: error.message
      });
    });
  };

  // Affiche un article avec ses commentaires
  exports.getArticle = async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    //await Article.findByPk(articleId, {
    await Article.findAndCountAll({
      where: id = articleId, 
      include: ['user',`comment`, {
        association: `comment` ,
        include: "user"
      }],
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

  // Liste tous les articles d`un utilisateur 
  exports.getArticlesUser = async (req, res) => {
    const userId = userToken.id
    await User.findAndCountAll( { 
        // Par id user et par mise a jour des articles
        where: id = userId,
        include:[model = 'article',],
        order: [[model = 'article',"updated_at", "DESC",]],
    }).then((user) => {
      if(!user) {
        throw new Error(`Utilisateur non trouvé.`);
      }
      res.status(200).json({
        success: true,
        message:(`Voici tous les articles de l'utilisateur.`),
        user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème pour lister tous les articles de l'utilisateur.`),
        error: error.message
      });
    });
  };

  // Affiche un article d'un utilisateur
  exports.getArticleUser = async (req, res) => {
    const userId = userToken.id
    const articleId = parseInt(req.params.articleId, 10);
    await Promise.all([
      User.findByPk(userId),
      Article.findByPk(articleId, {
       // include: `comment`,
              include: [`comment`,  `user`],

      })
    ]).then(values => {
      [user, article] = values;
        if(!user) {
          throw new Error(`Utilisateur non trouvé.`);
        }
        if(!article) {
          throw new Error(`Article non trouvé.`);
        }
        if(article.user_id !== user.id) {
          throw new Error(`Article de l'utilisateur non trouvé.`);
        }
        return (user, article);
    }).then(() => {
      res.status(200).json({
        success: true,
        message:(`Voici l'article de l'utilisateur.`),
        article
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème pour afficher l'article de l'utilisateur.`),
        error: error.message
      });
    });
  };

  // création d'un article d'un utilisateur
  exports.createArticleUser = async (req, res) => {
    const userId = userToken.id
    //const userId = req.body.user_id
    const {title, content} = req.body;
    let missingParams =[];
    if (!title) {
      missingParams.push(`le titre`);
    }
    if (!content) {
      missingParams.push(`le contenu`);
    }
    if (missingParams.length > 0) {
      return res.status(400).json(`Il manque des paramètres: ${missingParams.join(`, `)}.`);
    }
    await User.findByPk(userId),   
    await Article.create({
      title: req.body.title,
      content: req.body.content,
      user_id: userId 
    }).then(article => {
      res.status(201).json({
        success: true,
        message: (`Votre article a été créé.`),
        article,
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Votre article n'a pas été créé.`),
        error: error.message
      });
    });
  };

  // Suppression de l'article de l'utilisateur
  exports.deleteArticleUser = async (req, res) => {
    const userId = userToken.id
    const articleId = parseInt(req.params.articleId, 10);
    await Promise.all([
      User.findByPk(userId),
      Article.findByPk(articleId)
    ]).then(values => {
      [user, article] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé.`);
      }
      if(!article) {
        throw new Error(`Article non trouvé.`);
      }
      if(article.user_id !== userId) {
        throw new Error(`Article de l'utilisateur non trouvé.`);
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

  // Mise à jour de l'article de l'utilisateur
  exports.updateArticleUser = async (req, res) => {
    const userId = userToken.id
    const articleData = {
      title : req.body.title,
      content : req.body.content,
      user_id : userId
    } ;
    const articleId = parseInt(req.params.articleId, 10);
    await Promise.all ([
      User.findByPk(userId), 
      Article.findByPk(articleId)
    ]).then(values => {
      [user, article] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé.`);
      }
      if(!article) {
        throw new Error(`Article non trouvé.`);
      }
      if(article.user_id !== userId) {
        throw new Error(`Article de l'utilisateur non trouvé.`);
      }
      return article.update(articleData, user);           
    }).then( () => {
      res.status(200).json({
        success: true,
        message: (`Article mis à jour.`),
        article
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`L'article n'a pas été mis à jour.`),
        error: error.message
      });
    });
  };

  // compteur du nombre d`articles 
  exports.getCountArticles = async (req, res) => {
    await Article.count().then(articles => {
      res.status(200).json({
        success: true,
        message: (`Voici le nombre total d'articles => ${articles}.`),
        articles
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`impossible de compter le nombre d'articles.`),
        error: error.message
      });
    });
  };

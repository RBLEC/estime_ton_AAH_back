const { User } = require(`../models`);
const {generateAccessToken,generateRefreshToken }= require(`../middlewares/jwt`);
const bcrypt = require("bcrypt");

//* liste de tous les utilisateurs
exports.getUsers = async (req, res) => {
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
exports.getUser = async (req, res) => {
  const userId = userToken.id
  await User.findAndCountAll( { 
    where: id = userId,
    }).then((user) => {
      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Toutes les informations de l'utilisateur`,
        user,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec les informations de l'utilisateur, veuillez vous connecter.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses 10 dernier commentaires
exports.getUserLastComment = async (req, res) => {
  const userId = userToken.id
  await User.findAndCountAll( { 
    where: id = userId,
    include: [model = 'comment'], 
    order: [[ model = 'comment',"updated_at", "DESC",]],
    offset: 5,
    limit:10,
    subQuery: false,
  }).then((user) => {
      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Les 10 derniers commentaires`,
        user,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec les 10 derniers commentaires de l'utilisateur, veuillez vous connecter.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses 10 dernier articles
exports.getUserLastArticle = async (req, res) => {
  const userId = userToken.id
  await User.findAndCountAll( { 
    where: id = userId,
    include: [model = 'article'], 
    order: [[ model = 'article',"updated_at", "DESC",]],
    offset: 5,
    limit:10,
    subQuery: false,
  }).then((user) => {
      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Les 10 derniers articles`,
        user,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups, il y a un problème avec les 10 derniers articles de l'utilisateur, veuillez vous connecter.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses 10 dernier message du livre d'or
exports.getUserLastGuestbook = async (req, res) => {
  const userId = userToken.id
  await User.findAndCountAll( { 
    where: id = userId,
    include: [model = 'guestbook'], 
    order: [[ model = 'guestbook',"updated_at", "DESC",]],
    offset: 5,
    limit:10,
    subQuery: false,
  }).then((user) => {
      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Les 10 derniers messages du livre d'or`,
        user,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec les 10 derniers messages du livre d'or, veuillez vous connecter.`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses 10 dernières information de simulation
exports.getUserLastInfosimulation = async (req, res) => {
  const userId = userToken.id
  await User.findAndCountAll( { 
    where: id = userId,
    include: [model = 'infosimulation'], 
    order: [[ model = 'infosimulation',"updated_at", "DESC",]],
    offset: 5,
    limit:10,
    subQuery: false,
  }).then((user) => {
      if (!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message: `Les 10 dernières simulations`,
        user,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec les 10 dernières simulations de l'utilisateur, veuillez vous connecter..`,
        error: error.message,
      });
    });
};

//* création d'un utilisateur
exports.createUser = async (req, res) => {
  const { pseudo, email, birthdate, password, role, disability_rate, place_of_residence, apl  } = req.body;
  let missingParams = [];
  if (!pseudo) {
    missingParams.push(`Votre pseudo`);
  }
  if (!birthdate) {
    missingParams.push(`Votre date de naissance`);
  }
  if (!role) {
    missingParams.push(`role`);
  }
  if (!email) {
    missingParams.push(`Votre email`);
  }
  if (!password) {
    missingParams.push(`Votre mot de passe`);
  }
  if (missingParams.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Il manque des parametres: ${missingParams.join(`, `)}`,
    });
  }
  try {
    const userExist = await User.findOne({
      where: { pseudo: pseudo },
    });
    if (userExist) {
      // 409 conflit
      return res.status(409).json({
        success: false,
        message: `Pseudo déja existant !`,
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      pseudo: req.body.pseudo,
      password: hashPassword,
      email: req.body.email,
      role: req.body.role,
    };
    await User.create(newUser);
    res.status(200).json({
      success: true,
      message: `Tout c'est bien passé, l'utilisateur à bien été crée avec le pseudo ${pseudo}`,
      newUser
    });
  } catch (error) {
    console.trace(error);
    res.status(400).json({
      success: false,
      message: `Oups il y a un problème avec le pseudo ${pseudo}`,
      error: error.message,
    });
  }
};

//* Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
  const userId = userToken.id
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    pseudo: req.body.pseudo,
    password: hashPassword,
    email: req.body.email,
    role: req.body.role,
  };
  //* je récupère le user à modifier
  await User.findByPk(userId)
    .then((user) => {
      return user.update(userData);
    })
    .then((user) => {
      // lorsque le mise à jours est terminée je renvoi au client la usere modifiée
      res.status(200).json({
        success: true,
        message: `Utilisateur mis à jour`,
        user,
      });
    })
    .catch((error) => {
      console.trace(error);
      // si sequelize à eu une erreur je revoi un message au client ne JSON pour lui dire qu`il y a un pépin
      res.status(500).json({
        success: false,
        message: `L'utilisateur n'a pas été mis à jour`,
        error: error.message,
      });
    });
};

//* Suppréssion de l'utilisateur
exports.deleteUser = async (req, res) => {
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

//* compteur du nombre d'utilisateur enregister
exports.getCountUsers = async (req, res) => {
  await User.count()
    .then((users) => {
      res.status(200).json({
        success: true,
        message: `Voici le nombre total d'utilisateur => ${users}`,
        users,
      });
    })
    .catch((error) => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `impossible de compter le nombre d'utilisateur`,
        error: error.message,
      });
    });
};

//* pour login user
exports.loginUser = async (req, res) => {
  try {
    let userInfo;
    await User.findOne({
      where: { pseudo: req.body.pseudo },
    }).then((result) => {
      if (!result.dataValues.pseudo) {
        return res.status(401).json({
          success: false,
          message: `Données non trouvé !`,
        });
      }
      userInfo = result.dataValues;
    });
    bcrypt.compare(req.body.password, userInfo.password, (error) => {
      if (error) {
        throw new Error(error);
      }
    });
    const userLog = {
      id: userInfo.id,
      pseudo: userInfo.pseudo,
      email: userInfo.email,
      role: userInfo.role,
    };
    const accessToken = generateAccessToken(userLog);
    const refreshToken = generateRefreshToken(userLog);
    res.status(200).json({
      success: true,
      message: `Bienvenu ${userInfo.pseudo}`,
      userInfo,
      accessToken,
      refreshToken
    });
  } catch (error) {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `données non trouvé !`,
        error: error.message,
      });
  }
};

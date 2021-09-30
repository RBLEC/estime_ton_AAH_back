const { User } = require(`../models`);
const {generateAccessToken,generateRefreshToken }= require(`../middlewares/jwt`);
const bcrypt = require("bcrypt");

//* liste de tous les utilisateurs
exports.getUsers = (req, res) => {
  // J`utilise sequelize pour récupérer l`ensemble des listes
  User.findAll({
    order: [
      //[`id`, `DESC`]
      [`pseudo`],
    ],
  })
    .then((users) => {
      // dans le then (lorsque sequelize à enfin récupéré les listes) j`envoi les lites au client.
      // je répond en JSON car je suis une API
      res.status(200).json({
        success: true,
        message: `Voici la liste de tous les utilisateurs`,
        users,
      });
    })
    .catch((error) => {
      // si sequelize à eu une erreur je revoi un message au client ne JSON pour lui dire qu`il y a un pépin
      console.trace(error);
      res.status(500).json({
        success: false,
        message: `Oups il y a un problème avec la liste de tous les utilisateurs`,
        error: error.message,
      });
    });
};

//* liste un utilisateur avec ses revenus, ses articles et ses commentaires
exports.getUser = (req, res) => {
  const userId = userToken.id
  User.findByPk(userId, {
    include: [
      `income`,
      {
        association: `article`,
        include: [{ association: `comment` }, `comment`],
      },
      `comment`,
    ],
  })
    .then((user) => {
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
        message: `Oups il y a un problème avec les informations de l'utilisateur`,
        error: error.message,
      });
    });
};

//* création d'un utilisateur
exports.createUser = async (req, res) => {
  const { pseudo, email, birthdate, password, role } = req.body;
  let missingParams = [];
  if (!pseudo) {
    missingParams.push(`pseudo`);
  }
  if (!birthdate) {
    missingParams.push(`birthDate`);
  }
  if (!role) {
    missingParams.push(`role`);
  }
  if (!email) {
    missingParams.push(`email`);
  }
  if (!password) {
    missingParams.push(`password`);
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
    //const hashEmail = await bcrypt.hash(req.body.email, 10); //! a voir plus tard
    const newUser = {
      pseudo: req.body.pseudo,
      password: hashPassword,
      email: req.body.email,
      birthdate: req.body.birthdate,
      role: req.body.role,
    };
    await User.create(newUser);
    res.status(200).json({
      success: true,
      message: `Tout c'est bien passé, l'utilisateur à bien été crée avec le pseudo ${pseudo}`,
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
exports.updateUser = (req, res) => {
  const userData = req.body;
  const userId = userToken.id
  //* je récupère le user à modifier
  User.findByPk(userId)
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
exports.deleteUser = (req, res) => {
  const userId = userToken.id
  User.findByPk(userId)
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
exports.getCountUsers = (req, res) => {
  User.count()
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

//! a faire
  exports.logoutUser = (req, res) =>{
    console.log('on entre dans => logout')
  }
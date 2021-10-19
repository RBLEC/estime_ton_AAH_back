// ici on va vérifier le rôle de l'utilisateur

//! role : 1 visiteur enregistrer
//! role : 2 modérateur
//! role : 3 Admin

const adminMiddleware = (req, res, next) => {
    if(userToken.role !== 3){
      return res.status(403).json({
        success: false,
        message: `Vous n'avez pas les droits nécessaires pour accéder à cette page`,
      })
    };
  next ();
};

module.exports = adminMiddleware;

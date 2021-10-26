const { Nbsimulation, User } = require(`../models`);

  // compteur du nombre de simulation enregister
  exports.getCountNbsimulations = async (req, res) => {
    await Nbsimulation.count().then(simulations => {
      res.status(200).json({
        success: true,
        message: (`Le nombre total de simulation ${simulations}`),
        simulations
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`impossible de compter le nombre de simulation`),
        error: error.message
      });
    });
  };

  // compte et montre toutes les simulations
    exports.getNbsimulations = async (req, res) => {
    await Nbsimulation.findAndCountAll({
      order: [[`created_at`, `DESC`]]  
    }).then(nbsimulations => {
      res.status(200).json({
        success: true,
        message:(`Voici la liste de toutes les simulations des utilisateurs`),
        nbsimulations
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
      success: false,
      message:(`Oups il y a un problème avec la liste de toutes les simulations des utilisateurs`),
      error: error.message
      });
    });
  };

  // compte le nombre de simulation fait par un utilisateur
    exports.getNbsimulationsUser = async (req, res) => {
    const userId = userToken.id
    await User.findAndCountAll( {
      where: id = userId,
      include:[
        model = 'nbsimulation', 
      ],
      order:[[
        model = 'nbsimulation',
        "updated_at", "DESC",
      ]],
    }).then((user) => {
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      res.status(200).json({
        success: true,
        message:(`Voici le nombre de simulation de l'utilisateur`),
        user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème pour compter le nombre de simulation de l'utilisateur`),
        error: error.message
      });
    });
  };


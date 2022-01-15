const { User, Income} = require(`../models`);

  // liste tous les revenus de l'utilisateur
  exports.getIncomesUser = (req, res) => {
    const userId = userToken.id
    User.findByPk(userId, {
      include: `income`, 
    }).then((user) => {   
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }   
      res.status(200).json({
        success: true,
        message:(`Voici la liste tous les revenus de l'utilisateur`),
        user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème avec la liste tous les revenus de l'utilisateur`),
        error: error.message
      });
    });           
  };

  // Affiche un revenu de l'utilisateur
  exports.getIncomeUser = (req, res) => {
    const userId = userToken.id
    const incomeId = parseInt(req.params.incomeId, 10);  
    Promise.all([
      User.findByPk(userId),
      Income.findByPk(incomeId)
    ]).then(values => {
      [user, income] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!income) {
        throw new Error(`Revenu non trouvé`);
      }
      if(income.user_id !== user.id) {
        throw new Error(`Revenu de l'utilisateur non trouvé`);
      }
      return (user, income);
    }).then(() => {
      res.status(200).json({
        success: true,
        message:(`voici le revenu de l'utilisateur`),
        income
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups il y a un problème avec le revenu de l'utilisateur`),
        error: error.message
      });
    });
  };

  // création d'un revenu pour un utilisateur
  exports.createIncomeUser = (req, res) => {
    const userId = userToken.id
    const {year, amount, situation} = req.body;
    let missingParams =[];
    if (!year) {
      missingParams.push(`l'année'`);
    }
    if (!amount) {
      missingParams.push(`le revenu`);
    }
    if (!situation) {
      missingParams.push(`la situation`);
    }
    //! il prend le 0 comme vide
    // if (!nb_child) {
    //   missingParams.push(`le nombre d'enfant`);
    // }
    if (missingParams.length > 0) {
      return res.status(400).json(`Il manque des paramètres: ${missingParams.join(`, `)}`);
    }
    User.findByPk(userId),    
    Income.create({
      year: req.body.year,
      amount: req.body.amount,
      situation: req.body.situation,
      nb_child: req.body.nb_child,
      user_id: userId 
    })
    .then(income => {
      res.status(201).json({
        success: true,
        message: (`Revenu créé`),
        income,
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message:(`Oups le revenu n'a pas été créé`),
        error: error.message
      });
    });
  };

  // suppression d'un revenu de l'utilisateur
  exports.deleteIncomeUser = (req, res) => {
    const userId = userToken.id
    const incomeId = parseInt(req.params.incomeId, 10);
    Promise.all([
      User.findByPk(userId),
      Income.findByPk(incomeId)
    ]).then(values => {
      [user, income] = values;
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(!income) {
        throw new Error(`Revenu non trouvé`);
      }
      if(income.user_id !== userId) {
        throw new Error(`Revenu de l'utilisateur non trouvé`);
      }
      return income.destroy();
    }).then(() => {
      res.status(200).json({
        success: true,
        message: (`Revenu effacé`)
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le revenu n'a pas été effacé`),
        error: error.message
      });
    });
  };

  // Mise à jour d'un revenu de l'utilisateur
  exports.updateIncomeUser = (req, res) => {
    const incomeData = req.body;
    const userId = userToken.id
    const incomeId = parseInt(req.params.incomeId, 10);
    Promise.all ([
      User.findByPk(userId), 
      Income.findByPk(incomeId)
    ]).then(values => {
      [user, income] = values;
      if(!income) {
        throw new Error(`Revenu non trouvé`);
      }
      if(!user) {
        throw new Error(`Utilisateur non trouvé`);
      }
      if(income.user_id !== userId) {
        throw new Error(`Revenu de l'utilisateur non trouvé`);
      }
      return income.update(incomeData, user);           
    }).then( () => {
      res.status(200).json({
        success: true,
        message: (`Revenu mis à jour`),
        income, user
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Le revenu n'a pas été mis à jour`),
        error: error.message
        });
    });
  };

  // compteur de revenus enregistés
  exports.getCountIncomes = (req, res) => {
    Income.count().then(incomes => {
      res.status(200).json({
        success: true,
        essage: (`Voici le nombre total de revenus => ${incomes}`),
        incomes
      });
    }).catch(error => {
      console.trace(error);
      res.status(500).json({
        success: false,
        message: (`Impossible de compter le nombre de revenus`),
        error: error.message
      });
    });
  };

const axios = require('axios');

//! OpenFisca France
// Montant mensuel de l'allocation adulte handicapé
exports.getAAH = async (req, res) => {
  try {
    await axios
    .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.montant")
    .then(res =>{
      aahMontant= res.data.values;
      aahDescription= res.data.description;
      console.log(`nbs`, aahMontant);
      console.log(`res`, res);
    })
    res.status(200).json({
    success: true,
    aahDescription,
    aahMontant,
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Majoration du plafond de l'AAH pour un couple (en pourcentage du plafond de base)
exports.getMajorationPlafondCouple = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majoration_plafond_couple")
      .then(res =>{
        majorationPlafondCoupleCoef= res.data.values;
        majorationPlafondCoupleDescription= res.data.description;
      })
      res.status(200).json({
        success: true,
        majorationPlafondCoupleDescription,
        majorationPlafondCoupleCoef,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Majoration de plafond pour personne à charge (en pourcentage du plafond de base)
exports.getCoefPersonneACharge = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majoration_plafond_personne_a_charge")
      .then(res =>{
        coefPersonneACharge= res.data.values;
        coefPersonneAChargeDescription= res.data.description;
      })
      res.status(200).json({
      success: true,
        coefPersonneAChargeDescription,
        coefPersonneACharge,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Smic horaire brut
exports.getSmichb = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/marche_travail.salaire_minimum.smic_h_b")
      .then(res =>{
        smichb= res.data.values;
        smichbDescription= res.data.description;
      })
      res.status(200).json({
        success: true,
        smichbDescription,
        smichb,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Nombre d'heures travaillées forfaitaires
exports.getSmichbtf = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/marche_travail.salaire_minimum.nb_heure_travail_mensuel")
      .then(res =>{
        smichbtf= res.data.values;
        smichbtfDescription= res.data.description;
      })
      res.status(200).json({
        success: true,
        smichbtfDescription,
        smichbtf,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Majoration pour la vie autonome
exports.getMVA = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.caah.majoration_vie_autonome")
      .then(res =>{
        mva= res.data.values;
        mvaDescription= res.data.description;
      })
      res.status(200).json({
        success: true,
        mvaDescription,
        mva,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}
// Âge minimal pour bénéficier de l'AAH
exports.getAgeMinimal = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.age_minimal")
      .then(res =>{
        ageMinimal= res.data.values;
        ageMinimalDescription= res.data.description;
      })
      res.status(200).json({
        success: true,
        ageMinimalDescription,
        ageMinimal,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}
// Âge légal de départ à la retraite
exports.getAgeRetraite = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.age_legal_retraite")
      .then(res =>{
        ageRetraite= res.data.values;
        ageRetraiteDescription= res.data.description;
      })
      res.status(200).json({
        success: true,
        ageRetraiteDescription,
        ageRetraite,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Taux d'incapacité minimum pour bénéficier de l'AAH
exports.getTauxInvalidite = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.taux_incapacite")
      .then(res =>{
        tauxInvalidite = res.data.values;
        tauxInvaliditeDescription = res.data.description;
      })
      res.status(200).json({
        success: true,
        tauxInvaliditeDescription,
        tauxInvalidite,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

// Taux d'incapacité minimum
exports.getTauxInvaliditeMinimum = async (req, res) => {
  try {
    await axios
      .get("https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.asi.taux_minimum_d_invalidite")
      .then(res =>{
        tauxInvaliditeMinimum = res.data.values;
        tauxInvaliditeMinimumDescription = "Taux d'incapacité minimum";
      })
      res.status(200).json({
        success: true,
        tauxInvaliditeMinimumDescription,
        tauxInvaliditeMinimum,
      });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:(`Les serveurs d'OpenFisca FRANCE sont indisponible pour le moment`),
      error: error.message
    });
  }
}

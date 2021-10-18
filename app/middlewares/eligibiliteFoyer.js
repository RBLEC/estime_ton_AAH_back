  // Eligibilité 
  function eligibiliteFoyer (
    eligibiliteConjoint,
    eligibiliteDemandeur
  ) { 
    let eligibilite_Foyer;
    if (eligibiliteConjoint === true ) {
        eligibilite_Foyer = true;
    } 
    if (eligibiliteDemandeur === true ) {
        eligibilite_Foyer = true;
    } else {
      eligibilite_Foyer = false;
    }
      return eligibilite_Foyer;
    };
module.exports = eligibiliteFoyer;


  // Eligibilité AAH
  function eligibiliteMVA(
    apl,
    disability_rate,
    tauxInvaliditeMax,
    revenusAvecActivite
    ) { 
      let eligibilite_MVA;
      if (apl === true ) {
        eligibilite_MVA = true;
        if (disability_rate >=  tauxInvaliditeMax ) {
          eligibilite_MVA = true;
            if (revenusAvecActivite ===  0 ) {
              eligibilite_MVA = true;
            } else {
              eligibilite_MVA = false;
            }
        } else {
        eligibilite_MVA = false;
        }
      } else {
        eligibilite_MVA = false;
      }
    return eligibilite_MVA;
    };

module.exports = eligibiliteMVA;


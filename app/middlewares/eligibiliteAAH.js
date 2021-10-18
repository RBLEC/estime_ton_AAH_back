  // Eligibilité AAH
  function eligibiliteAAH (
    invalide,
    age, 
    ageMinimal, 
    ageRetraite,
    invaliditeDemandeur,
    tauxInvaliditeMinimum,
    residenceFrance
    ) { 
      let eligibilite_AAH;
      if (invalide === true ) {
        eligibilite_AAH = true;
        if (age >= ageMinimal ) {
          eligibilite_AAH = true;
          if (age < ageRetraite ) {
            eligibilite_AAH = true;
              if ( invaliditeDemandeur >= tauxInvaliditeMinimum ) {
                  eligibilite_AAH = true;
                  if (residenceFrance == true) {
                    eligibilite_AAH = true;
                  } else {
                    eligibilite_AAH = false;
                  }
              } else {
                eligibilite_AAH = false;
              }
            } else {
              eligibilite_AAH = false;
            }
        } else {
          eligibilite_AAH = false;
        }
    } else {
      eligibilite_AAH = false;
      }
      return eligibilite_AAH;
    };
module.exports = eligibiliteAAH;


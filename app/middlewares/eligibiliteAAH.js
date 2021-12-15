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

      console.log(`invalide`, invalide)
      console.log(`invalide boolean`, Boolean(invalide))
      console.log(`age`, age)
      console.log(`invaliditeDemandeur`, invaliditeDemandeur)
      console.log(`tauxInvaliditeMinimum`, tauxInvaliditeMinimum)
      console.log(`residenceFrance`, residenceFrance)

      let eligibilite_AAH;
      if (Boolean(invalide) === true ) {
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


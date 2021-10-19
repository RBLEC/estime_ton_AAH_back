  //* fonction des revenus enfants
    function revenus_des_enfants(
        nbPersonneACharge,
        revenusEnfant1,
        revenusEnfant2,
        revenusEnfant3,
        revenusEnfant4,
        revenusEnfant5
    ){
      if ( nbPersonneACharge >= 1) {
        revenusEnfants = revenusEnfant1 ;
        if ( nbPersonneACharge >= 2 ) {
          revenusEnfants = revenusEnfant1 + revenusEnfant2 ;
        if ( nbPersonneACharge >= 3 ) {
          revenusEnfants = revenusEnfant1 + revenusEnfant2 + revenusEnfant3 ;
          if ( nbPersonneACharge >= 4 ) {
            revenusEnfants = revenusEnfant1 + revenusEnfant2 + revenusEnfant3 + revenusEnfant4 ;
            if ( nbPersonneACharge >= 5 ) {
              revenusEnfants = revenusEnfant1 + revenusEnfant2 + revenusEnfant3 + revenusEnfant4 + revenusEnfant5 ;
            } else {
              revenusEnfants = (
                revenusEnfant4 +
                revenusEnfant3 + 
                revenusEnfant2 + 
                revenusEnfant1);
              }
          } else {
            revenusEnfants = (
              revenusEnfant3 + 
              revenusEnfant2 + 
              revenusEnfant1 );
            }
        } else {
            revenusEnfants = (
            revenusEnfant2 + 
            revenusEnfant1 );
          }
        } else {
          revenusEnfants =
            revenusEnfant1 ;
        }
      } else {
        revenusEnfants =0;
      };
      return revenusEnfants;
    };

  module.exports = revenus_des_enfants;
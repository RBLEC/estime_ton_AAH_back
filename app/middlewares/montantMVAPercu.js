  //* Somme à percevoir AAH + MVA
  function sommePercuAAHAvecMVA(
    eligibiliteMVA, 
    SansMVA,
    aahMontant,
    mva,
  ){
    if ( eligibiliteMVA === true) {
        montant = SansMVA + mva ;
        if (SansMVA == aahMontant ) {
          montant = SansMVA + mva ;
      } else {
        montant = SansMVA;
      }
    } else {
      montant = SansMVA;
    };
    return montant;
  };

module.exports = sommePercuAAHAvecMVA;

  //* Le montant AAH a percevoire
  function montantAAHPercu(
    eligibiliteAAH, 
    resultassietteTotalFoyer,
    aahMontant
  ){

      console.log(`object`, resultassietteTotalFoyer)
      
    if ( eligibiliteAAH === false ) {
      montant = 0 ;
    } else if ( resultassietteTotalFoyer  < 0) {
      montant = 0 ;
    } else if (resultassietteTotalFoyer  < aahMontant) {
      montant = resultassietteTotalFoyer;
    } else {
      montant = aahMontant ;
    }
    return montant;
  };

module.exports = montantAAHPercu;
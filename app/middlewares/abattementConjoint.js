  function abattementConjoint(
    nb_child,
  ){
      abattement_conjoint = 5000;
      abattement_enfant = 1400;

      abattement = 
        abattement_conjoint +
        abattement_enfant * nb_child
    
    return (abattement
    ) ;
  };
  module.exports = abattementConjoint;
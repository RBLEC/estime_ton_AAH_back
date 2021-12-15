//* Fonction si la personne handicapé travail
  function assiette(
    invalidite,
    smichb,
    smicnbtf,
    revenusSalarial,
    revenusNonSalarial,
    ) { 
      let total_assiette;
      if (invalidite === true){
        total_assiette = assiette_demandeur(
          parseInt(smichb),
          parseInt(smicnbtf),
          parseInt(revenusSalarial),)
      } else {
        total_assiette = assiette_conjointEnfant(parseInt(revenusSalarial),parseInt(revenusNonSalarial))
      }

      console.log(`total_assiette`, total_assiette)
    return parseInt(total_assiette)
  };

module.exports = assiette;

    //* fonction des revenus de la personne invalide
  function assiette_demandeur(  
    smichb,
    smicnbtf,
    revenusSalarial,){
    smic_brut_annuel = 12 * parseInt(smichb) * parseInt(smicnbtf);
    //! ici seulement si il touche 30%  de plus que le smic brute annuel sinon tranche 1 = 0  
    let tranche1 ;
      if( (( smic_brut_annuel * 1.3) < revenusSalarial)) {
        tranche1 = parseInt(revenusSalarial) - parseInt(smic_brut_annuel) * 1.3  ;
      }else { 
        tranche1 = 0;
      }
    const tranche2 = parseInt(revenusSalarial) - tranche1;
    return ((1 - 0.8) * tranche1 + (1 - 0.4) * tranche2);
  };

    //* fonction du conjointEnfant (valide)
  function assiette_conjointEnfant(revenusSalarial, revenusNonSalarial){
    return 0.9 * (1 - 0.2) * (revenusSalarial + revenusNonSalarial);
  };






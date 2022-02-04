

//* Fonction si la personne handicapée travaille
  function assiette(
    invalidite,
    smichb,
    smicnbtf,
    revenusSalarial,
    revenusNonSalarial,
    nb_child,
    abattement2022
    ) { 

      console.log('revenusSalarial 1', revenusSalarial);
      console.log('revenusNonSalarial 1 ', revenusNonSalarial)

      let total_assiette;
      if (invalidite === true){
        total_assiette = assiette_demandeur(
          Number(smichb),
          Number(smicnbtf),
          Number(revenusSalarial),)
      } else {
        total_assiette = assiette_conjointEnfant(
          Number(revenusSalarial),
          Number(revenusNonSalarial),
          Number(abattement2022))
        

      }
    return Number(total_assiette)
  };

module.exports = assiette;

    //* fonction des revenus de la personne invalide
  function assiette_demandeur(  
    smichb,
    smicnbtf,
    revenusSalarial,
    revenusNonSalarial,
    nb_child,
    abattement2022
  ){
    smic_brut_annuel = 12 * Number(smichb) * Number(smicnbtf);
    //! ici seulement s'il touche 30%  de plus que le smic brut annuel sinon tranche 1 = 0  
    let tranche1 ;
      if( (( smic_brut_annuel * 1.3) < (revenusSalarial))) {
        tranche1 = Number(revenusSalarial) - Number(smic_brut_annuel) * 1.3  ;
      }else { 
        tranche1 = 0;
      }
    const tranche2 = Number(revenusSalarial) - tranche1;
    return ((1 - 0.8) * tranche1 + (1 - 0.4) * tranche2);
  };

    //* fonction du conjointEnfant (valide)
  function assiette_conjointEnfant(revenusSalarial, revenusNonSalarial,abattement2022){

    total_assiette = 
      (Number(revenusSalarial) +
      Number(revenusNonSalarial) )* 0.9 -
      Number(abattement2022)

    return total_assiette;
  };






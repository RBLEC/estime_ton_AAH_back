//console.log(`je suis dans la formule`)

  // Les données à importer
  const aahMontant = 903.6; // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.montant
  const majorationPlafonCouple = 0.81; // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majorationPlafonCouple
  const coefPersonneACharge = 0.5 ; // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majoration_plafond_personne_a_charge
  const smichb = 10.25 ; // https://fr.openfisca.org/api/latest/parameter/marche_travail.salaire_minimum.smic_h_b
  const smicnbtf = 151.67 ; // https://fr.openfisca.org/api/latest/parameter/marche_travail.salaire_minimum.nb_heure_travail_mensuel
  const mva = 104.77 ; // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.caah.majoration_vie_autonome

  // pour l'éligibilité AAH & MVA
  const ageMinimal = 20 ; // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.age_minimal
  const ageRetraite = 62 ; // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.age_legal_retraite 
  const tauxInvalidite = 0.8 // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.taux_incapacite
  const tauxInvaliditeMinimum = 0.6666 // https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.asi.taux_minimum_d_invalidite

  //! info à demander
  // éligibilité
  const age = 61;
  const invaliditeDemandeur = 0.8 ;
  const residenceFrance = true ;
  const apl = true;

  //! composition du foyer
  //const union = 'seul';
  const union ="couple";
  const nbPersonneACharge = 2 ;

  //! les revenus
  const revenusDemandeurSansActivite = 00000*12; // salaire net imposable annuelle / mensuelle
  const revenusDemandeurAvecActivite = 000*12;
  const revenusConjoint = 2000*12 ; //1554*12; //salaire net imposable annuelle / mensuelle
  const revenusEnfant1 = 1 ; //salaire net imposable annuelle / mensuelle
  const revenusEnfant2 = 20 ; //salaire net imposable annuelle / mensuelle
  const revenusEnfant3 = 300 ; //salaire net imposable annuelle / mensuelle
  const revenusEnfant4 = 4000 ; //salaire net imposable annuelle / mensuelle
  const revenusEnfant5 = 50000 ; //salaire net imposable annuelle / mensuelle

  //! Toutes les Fonctions
  // Eligibilité AAH du demandeur
  function eligibiliteAAHDemandeur (
    age, 
    ageMinimal, 
    ageRetraite,
    invaliditeDemandeur,
    tauxInvaliditeMinimum,
    residenceFrance,
  ) {
    let eligibilite_AAH;
  if (age >= ageMinimal ) {
    eligibilite_AAH === true;
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
  return eligibilite_AAH;
  };
module.exports = eligibiliteAAHDemandeur;


  // Eligibilité MVA
  function eligibiliteMVADemandeur() {
  if (apl == true ) {
    eligibilite_MVA = true;
    if (invaliditeDemandeur >=  tauxInvalidite ) {
      eligibilite_MVA = true;
        if (revenusDemandeurAvecActivite ===  0 ) {
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

  // Fonction pour le plafond du foyer
  function aahPlafondRessourcesMois(situation, nb_personne_a_charge){
    if (situation === 'couple') {
      coef_union = 1 + majorationPlafonCouple;
    }else { 
      coef_union = 1;
    }
    return (coef_union + 
      (coefPersonneACharge * nb_personne_a_charge)
    ) * aahMontant ;
  };

 
  // Coef du foyer
    function coefFoyer(
      situation, 
      majorationPlafonCouple,
      nb_personne_a_charge,
      coefPersonneACharge
      ){
    if (situation === 'couple') {
      coef_union = 1 + majorationPlafonCouple;
    }else { 
      coef_union = 1;
    }
    return (coef_union + 
      (coefPersonneACharge * nb_personne_a_charge)
    ) ;
  };
  module.exports = coefFoyer;
 
  //* Fonction si la personne handicapée travaille
  function assiette_demandeur(revenus_demandeur){
    smic_brut_annuel = 12 * smichb * smicnbtf;
    //! ici seulement s'il touche 30%  de plus que le smic brute annuel sinon tranche 1 = 0  
    let tranche1 ;
      if( (( smic_brut_annuel * 1.3) < revenus_demandeur)) {
        tranche1 = revenus_demandeur - smic_brut_annuel * 1.3  ;
      }else { 
        tranche1 = 0;
      }
    const tranche2 = revenus_demandeur - tranche1;
    return ((1 - 0.8) * tranche1 + (1 - 0.4) * tranche2);
  };

  //* fonction du conjoint (valide)
  function assiette_conjoint(revenus_conjoint){
    return 0.9 * (1 - 0.2) * revenus_conjoint;
  };

  //* fonction des revenus enfants
    function revenus_des_enfants(){

      let revenusEnfants;

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

  //* Fonction assiette des enfants
  function assiette_enfant(revenusToTalEnfant){
  return   0.9 * (1 - 0.2) * revenusToTalEnfant;
  };

  //* Le montant AAH à percevoir
  function montantAAHPercu(resultAssietteTotalFoyer){
    if ( eligibiliteAAH === false ) {
      montant = 0 ;
    } else if ( resultAssietteTotalFoyer  < 0) {
      montant = 0 ;
    } else if (resultAssietteTotalFoyer  < aahMontant) {
      montant = resultAssietteTotalFoyer;
    } else {
      montant = aahMontant ;
    }
    return montant;
  };
  
  //* Somme à percevoir AAH + MVA
  function sommePercuAAHAvecMVA(SansMVA){
      let montant;
      if ( eligibiliteMVA === true) {
        if ( revenusDemandeurAvecActivite === 0 ) {
          montant = SansMVA + mva ;
          if (SansMVA === aahMontant ) {
            montant = SansMVA + mva ;
          } else {
            montant = SansMVA;
          }
        } else {
          montant = SansMVA;
        }
      } else {
        montant = SansMVA;
      };
      return montant;
    };



    //! aah status a faire






  //! Les variables des fonctions :
    // éligibilité AAH & MVA
    //const eligibiliteAAH = eligibiliteAAHDemandeur(age, invaliditeDemandeur);
    
    const eligibiliteMVA = eligibiliteMVADemandeur( invaliditeDemandeur);

    // les revenus
    const revenusDemandeurTotal = revenusDemandeurAvecActivite + revenusDemandeurSansActivite ;
    const revenusToTalEnfant =  revenus_des_enfants();
    const revenusTotalFoyer = revenusDemandeurTotal + revenusConjoint + revenusToTalEnfant;

    // Plafond du foyer
    const plafondFoyerMensuel = Math.round(aahPlafondRessourcesMois(union, nbPersonneACharge));
    const plafondFoyerAnnuel = Math.round(aahPlafondRessourcesMois(union, nbPersonneACharge)*12) ;

    // Les assiettes
    const assietteDemandeur = assiette_demandeur(revenusDemandeurTotal);
    const assietteConjoint = assiette_conjoint(revenusConjoint);
    const assietteDesEnfants = assiette_enfant(revenusToTalEnfant);
    const assietteTotalFoyerAnnuel = assietteDemandeur + assietteConjoint + assietteDesEnfants;

    
    // Montant AAH sur assiette
    const aahMontantSurAssietteAnnuel = Math.round(plafondFoyerAnnuel - assietteTotalFoyerAnnuel);
    const aahMontantSurAssietteMensuel = Math.round(aahMontantSurAssietteAnnuel / 12);

    // Montant AAH à percevoir
    const AAHPercuMax = montantAAHPercu(aahMontantSurAssietteMensuel);

    // Somme à percevoir AAH + MVA
    const AAHAvecMVA = sommePercuAAHAvecMVA(AAHPercuMax);
  
    
    //! donnée à sortir
    console.log(`Données à afficher =======>`);
    console.log(`---------------------------------`);

      console.log(`=> composition du foyer`);
    console.log(`Type d'Union =>`, union);
    console.log(`Nombre de personne à charge =>`, nbPersonneACharge);
    console.log(`---------------------------------`);

      console.log(`=> éligibilité `);
    console.log(`eligibilite AAH =>`, eligibiliteAAH);
    console.log(`eligibilite MVA =>`, eligibiliteMVA);
    console.log(`---------------------------------`);
  
      console.log(`=> Les revenus du foyer `);
    console.log(`Total revenus du Demandeur sans Activité =>`, revenusDemandeurSansActivite);
    console.log(`Total revenus du Demandeur avec Activité=>`, revenusDemandeurAvecActivite);
    console.log(`Total des revenus du Demandeur =>`, revenusDemandeurTotal);
    console.log(`Les revenus du Conjoint =>`, revenusConjoint);
    console.log(`Les revenus de l'Enfant 1 =>`, revenusEnfant1);
    console.log(`Les revenus de l'Enfant 2 =>`, revenusEnfant2);
    console.log(`Les revenus de l'Enfant 3 =>`, revenusEnfant3);
    console.log(`Les revenus de l'Enfant 4 =>`, revenusEnfant4);
    console.log(`Les revenus de l'Enfant 5 =>`, revenusEnfant5);
    console.log(`Revenus total Des Enfants ==> `,revenusToTalEnfant); 
    console.log(`Revenus Total du Foyer ===>`, revenusTotalFoyer);
    console.log(`---------------------------------`);

      console.log(`=> Le plafond du foyer `)
    console.log(`plafond du foyer mensuel =>`, plafondFoyerMensuel);
    console.log(`plafond du foyer annuel =>`, plafondFoyerAnnuel);    
    console.log(`---------------------------------`);

      console.log(`=> Le montant AAH a percevoir au Maximum `);
    console.log(`Montant AAH à percevoir annuellement au Maximum`, aahMontantSurAssietteAnnuel);
    console.log(`Montant AAH à percevoir mensuellement au Maximum`, aahMontantSurAssietteMensuel);
    console.log(`---------------------------------`);

      console.log(`=> Montant AAH à percevoir `);
    console.log(`Montant AAH à percevoir Mensuellement`, AAHPercuMax);
    console.log(`Montant AAH à percevoir Annuellement`, AAHPercuMax*12);
    console.log(`---------------------------------`);

      console.log(`=> Montant AAH + MVA à percevoir `);
    console.log(`Montant AAH + MVA à percevoir Mensuellement `, AAHAvecMVA);
    console.log(`Montant AAH + MVA à percevoir Annuellement `, AAHAvecMVA*12);
    console.log(`---------------------------------`);

    console.log(`limite avant atteinte du plafond`, plafondFoyerAnnuel - revenusTotalFoyer)
    

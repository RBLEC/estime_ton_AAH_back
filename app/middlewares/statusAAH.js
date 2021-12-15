const phraseFin = require("../middlewares/phraseFin");

//* phrase de fin détailler
    function statusAAH(
      household_composition  ,
      nb_child,
      eligibiliteAAH,
      eligibiliteMVA,
      coefDuFoyer,
      aahPlafondRessourcesMois,
      years,
      applicant_income_without_activity,
      applicant_income_with_activity,
      spouse_income_without_activity,
      spouse_income_with_activity,
      revenusDesEnfants,
      aah_amount,
      montantAAHAvecMVA,
      ){

        const statusSimple = phraseFin(aah_amount,montantAAHAvecMVA,);

        phraseSituation = householdComposition(household_composition)
        phraseEnfant = NBChild(nb_child)
        phraseAAH = phraseEligibiliteAAH(eligibiliteAAH);
        phraseMVA = phraseEligibiliteMVA(eligibiliteMVA);
        phraseCoef = (`Le coefficient de votre foyer est de ${coefDuFoyer}`);
        phrasePlafond = (`avec un plafond de ${aahPlafondRessourcesMois.toFixed(2)} € mensuel, soit un plafond annuel de ${(aahPlafondRessourcesMois*12).toFixed(2)} €.`)
        sommeRevenuFoyer = revenusTotalFoyer(                
          applicant_income_without_activity,
          applicant_income_with_activity,
          spouse_income_without_activity,
          spouse_income_with_activity,
          revenusDesEnfants,
        );
        phraseRevenusFoyer =(`Le revenu total du foyer sur l'année ${years-2} est de ${sommeRevenuFoyer} €`);
        let montantPercu = statusSimple;

        return (`Suite aux informations données pour la simulation: ${phraseSituation}, et ${phraseEnfant}. ${phraseAAH}, ${phraseMVA}. ${ phraseCoef}, ${phrasePlafond} ${phraseRevenusFoyer}. ${montantPercu} ` );
      };
  module.exports = statusAAH;

  function householdComposition(household_composition){
    if (household_composition === 'en couple') {
      phraseSituation = (`Vous vivez en couple`);
    } else { 
      phraseSituation = (`Vous vivez seul`);
    } return phraseSituation;
  };

  function NBChild(nb_child){
    if (nb_child > 0 ) {
      phrase = (`vous avez ${nb_child} enfants ou personne à charge`);
    } else { 
      phrase = (`vous n'avez pas d'enfant ou de personne à charge`);
    } return phrase;
  };

  function phraseEligibiliteAAH(eligibiliteAAH){
    if (eligibiliteAAH === true) {
      phrase = (`Vous êtes éligible à l'AAH`);
    } else { 
      phrase = (`vous n'êtes pas éligible à l'AAH `);
    } return phrase;
  };

  function phraseEligibiliteMVA(eligibiliteMVA){
    if (eligibiliteMVA === true) {
      phrase = (`et aussi à la MVA`);
    } else { 
      phrase = (`mais vous n'êtes pas éligible à la MVA`);
    } return phrase;
  };

  function revenusTotalFoyer(              
    applicant_income_without_activity,
    applicant_income_with_activity,
    spouse_income_without_activity,
    spouse_income_with_activity,
    revenusDesEnfants
  ) {total = (
      Number(applicant_income_without_activity)+
      Number(applicant_income_with_activity)+
      Number(spouse_income_without_activity)+
      Number(spouse_income_with_activity)+
      Number(revenusDesEnfants)
      )
    //  console.log(`total`, total)
    //  console.log(`typeOf`, typeof total) 
    return total;
  };

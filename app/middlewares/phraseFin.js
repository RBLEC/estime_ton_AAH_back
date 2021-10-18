//* Phrase simple
function phraseFin(
    aah_amount,
    montantAAHAvecMVA
  ){
    if (montantAAHAvecMVA <= 0 )
      phrase =  (`Vous ne pouvez pas percevoir votre AAH.`);
    else if (montantAAHAvecMVA <= (aah_amount-1)) {
      phrase = (`Vous pouvez percevoir l'AAH à taux réduit pour un montant total de ${montantAAHAvecMVA.toFixed(2)} € par mois, soit ${Math.round(montantAAHAvecMVA -  (aah_amount))} € de moins par mois par rapport au montant maximum de l'AAH.`)
    } else if (montantAAHAvecMVA === aah_amount) {
      phrase =  (`Vous pouvez percevoir l'AAH sans la MVA pour un montant total de ${montantAAHAvecMVA.toFixed(2)} € par mois.`);
    } else {
      phrase = (`Vous pouvez percevoir l'AAH avec la MVA pour un montant total de ${montantAAHAvecMVA.toFixed(2)} € par mois.`);
    }
    return phrase
  };

  module.exports = phraseFin;
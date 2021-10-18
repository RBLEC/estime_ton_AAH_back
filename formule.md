# ici la formule de calcul de l'AAH

## 1 Demande d'information

### Eligibilité

- AAH :
  - Entre 20 ans et 62 ans
  - un taux >= 0.8
  - ne pas avoir travailler dans les 12 dernier mois
  - ou:
    - ou un taux compris entre 50 et 79 %
    - ne pas avoir travailler dans les 12 dernier mois
    - résidé en france

- pour MVA = Percevoir l'AAH à taux plein +( Majoration pour la vie autonome (MVA))

  - Avoir un taux d'incapacité au moins égal à 80 %
  - Disposer d'un logement indépendant
  - Percevoir une aide au logement, (APL)
  - Ne pas percevoir de revenu d'activité.
2

- Composition familliale :  => prement de connaitre le plafond du foyer
  - Situation familliale : seul / couple
  - nombre d'enfant à charge 

3
- Les revenues a prendre en compte
  - Salaire net imposable n-2
  - 'gains_exceptionnels',
  - 'pensions_alimentaires_percues',
  - 'pensions_alimentaires_versees_individu',
  - 'prestation_compensatoire',
  - 'rsa_base_ressources_patrimoine_individu',
  - Revenus des professions non salariées
  - revenu_assimile_pension




## les sources pour les calcules

- AAH
  - https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.age_minimal
  - https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.age_legal_retraite
  - https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.taux_incapacite

- MVA
  - https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.caah.majoration_vie_autonome



## La Formule en python

```py
class aah_base_ressources(Variable):
    value_type = float
    label = "Base ressources de l'allocation adulte handicapé"
    entity = Individu
    definition_period = MONTH
    set_input = set_input_divide_by_period

    def formula(individu, period, parameters):
        law = parameters(period)

        en_activite = individu('salaire_imposable', period) > 0

        def assiette_conjoint(revenus_conjoint):
            return 0.9 * (1 - 0.2) * revenus_conjoint

        def base_ressource_eval_annuelle():
            base_ressource = individu('aah_base_ressources_eval_annuelle', period)

            base_ressource_demandeur_conjoint = individu.famille.demandeur('aah_base_ressources_eval_annuelle', period)
            base_ressource_conjoint_conjoint = individu.famille.conjoint('aah_base_ressources_eval_annuelle', period)
            base_ressource_conjoint = base_ressource_conjoint_conjoint * individu.has_role(Famille.DEMANDEUR) + base_ressource_demandeur_conjoint * individu.has_role(Famille.CONJOINT)

            return assiette_revenu_activite_demandeur(base_ressource) + assiette_conjoint(base_ressource_conjoint)

        return where(
            en_activite,
            base_ressource_eval_trim(),
            base_ressource_eval_annuelle()
            )

```

            Fin de la formule


## Formule simplifier pour une personne n'aillant pas travailler sur les 12 dernier mois

une personne seule:

Montant mensuel de l'allocation adulte handicapé + ( nombre d'enfant * Majoration de plafond pour personne à charge) = Plafond du foyer

aah_montant + (nb_enfant * aah_majoration_plafond_personne_a_charge) = aah_plafond_ressources

Les data
https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.montant
https://fr.openfisca.org/api/latest/parameter/prestations.minima_sociaux.aah.majoration_plafond_personne_a_charge

---

## formule en couple dont un travail :

seul +(couple * coef ) + nombre d'enfant = plafond aah


const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class Infosimulation extends Model {};

Infosimulation.init({
    //! DATA
    year: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    aah_amount: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    mva_amount: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    smichb: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    smicnbtf: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    ageMinimal: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    ageRetraite: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    disability_rate_mini: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    disability_rate_max: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    majorationPlafonCouple: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    coefPersonneACharge: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    //! Info Foyer
    household_composition: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    nb_child: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    place_of_residence: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    apl: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    //! Le demandeur
    applicant_age: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    applicant_disability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    applicant_disability_rate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    applicant_eligibility_aah: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    applicant_eligibility_mva: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    applicant_income_without_activity: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    applicant_income_with_activity: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    //! Le conjoint
    spouse_age: {
        type: DataTypes.INTEGER, 
        allowNull: true
    },
    spouse_disability: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    spouse_disability_rate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spouse_eligibility_aah: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    spouse_eligibility_mva: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    spouse_income_without_activity: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    spouse_income_with_activity: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    //! Les enfants
    child_income1: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    child_income2: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    child_income3: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    child_income4: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    child_income5: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    //! le Résultat
    coef_foyer: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    plafond_foyer_annuel: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    plafond_foyer_mensuel: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    eligibilite_aah_foyer: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    },
    eligibilite_mva_foyer: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    },
    assiette_demandeur: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    assiette_conjoint: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    assiette_enfant: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    assiette_total: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },    
    aah_max: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    montant_aah_sans_mva_mensuel: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    montant_aah_avec_mva_mensuel: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    status_aah: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    status_simple: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
}, {
    sequelize,
    tableName: "infosimulation",
    timestamps: true
});

module.exports = Infosimulation;
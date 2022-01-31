
-- DATA Table --

-- En SQL on va respecter les conventions suivantes : snake case, minuscule, singulier

-- début de la transaction qui permet d'annuler le code exécuté en cas d'erreur au lieu que ça passe à la suite sans arrêter l'exécution du fichier

BEGIN;

-- Supprime les tables si elles existent déjà, comme ça on est sûr de partir sur de bonnes bases
-- On rajoute CASCADE pour ne pas avoir de probleme de références cassées 
--DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "infosimulation" CASCADE;
--DROP TABLE IF EXISTS "article" CASCADE;
--DROP TABLE IF EXISTS "guestbook" CASCADE; 
--DROP TABLE IF EXISTS "comment" CASCADE;
--DROP TABLE IF EXISTS "nbsimulation" CASCADE;
--DROP TABLE IF EXISTS "article_guestbook_comment_user" CASCADE; -- ! on ferme avec un " ; " 


-- Création de la TABLE "utilisateur"
CREATE TABLE IF NOT EXISTS "user" ( 
    "id" SERIAL PRIMARY KEY, 
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "author" TEXT NULL,
    "role" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "infosimulation" (
    "id" SERIAL PRIMARY KEY, 
    -- Data
    "year" INTEGER NOT NULL,
    "aah_amount" TEXT NOT NULL,
    "mva_amount" TEXT NOT NULL,
    "smichb" TEXT NOT NULL,
    "smicnbtf" TEXT NOT NULL,
    "ageMinimal" INTEGER NOT NULL,
    "ageRetraite" INTEGER NOT NULL,
    "disability_rate_mini" TEXT NOT NULL, 
    "disability_rate_max" TEXT NOT NULL,
    "majorationPlafonCouple" TEXT NOT NULL,
    "coefPersonneACharge" TEXT NOT NULL,
    -- Info Foyer
    "household_composition" TEXT NOT NULL,
    "nb_child" INTEGER NOT NULL,
    "place_of_residence" BOOLEAN NOT NULL, 
    "apl" TEXT NOT NULL,       
    -- le demandeur
    "applicant_age" INTEGER NOT NULL,
    "applicant_disability" BOOLEAN NOT NULL,
    "applicant_disability_rate" TEXT NOT NULL,
    "applicant_eligibility_aah" BOOLEAN NOT NULL,
    "applicant_eligibility_mva" BOOLEAN NOT NULL,
    "applicant_income_without_activity" INTEGER NOT NULL,
    "applicant_income_with_activity" INTEGER NOT NULL,
    -- le conjoint
    "spouse_age" INTEGER NULL,
    "spouse_disability" BOOLEAN NULL,
    "spouse_disability_rate" TEXT NULL,
    "spouse_eligibility_aah" BOOLEAN NULL,
    "spouse_eligibility_mva" BOOLEAN NULL,
    "spouse_income_without_activity" INTEGER NULL,
    "spouse_income_with_activity" INTEGER NULL,
    -- les enfants
    "child_income1" INTEGER NULL,
    "child_income2" INTEGER NULL,
    "child_income3" INTEGER NULL,
    "child_income4" INTEGER NULL,
    "child_income5" INTEGER NULL,
    -- le résultat
    "coef_foyer" TEXT NOT NULL,
    "plafond_foyer_annuel" TEXT NOT NULL,
    "plafond_foyer_mensuel" TEXT NOT NULL,
    "eligibilite_aah_foyer"  BOOLEAN NOT NULL,
    "eligibilite_mva_foyer" BOOLEAN NOT NULL,
    "abattement2022" INTEGER NULL,
    "assiette_demandeur" TEXT NOT NULL,
    "assiette_conjoint"  TEXT NOT NULL,
    "assiette_enfant"  TEXT NOT NULL,
    "assiette_total"  TEXT NOT NULL,
    "aah_max"  TEXT NOT NULL,
    "montant_aah_sans_mva_mensuel"  TEXT NOT NULL,
    "montant_aah_avec_mva_mensuel" TEXT NOT NULL,
    "status_aah"  TEXT NOT NULL,
    "status_simple"   TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "article" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE
);

--pour la V2
CREATE TABLE IF NOT EXISTS "guestbook" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "comment" (
    "id" SERIAL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP NULL DEFAULT NOW(),
    "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE,
    "article_id" INT REFERENCES "article"("id") ON DELETE CASCADE,
    "guestbook_id" INT REFERENCES "guestbook"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "nbsimulation" ( 
    "id" SERIAL PRIMARY KEY, 
    "content" TEXT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE
);

  CREATE TABLE IF NOT EXISTS "article_guestbook_comment_simulation_user" (
      "article_id" INTEGER NOT NULL REFERENCES "article"("id") ON DELETE CASCADE,
      "guestbook_id" INTEGER NOT NULL REFERENCES "guestbook"("id") ON DELETE CASCADE,
      "comment_id" INTEGER NOT NULL REFERENCES "comment"("id") ON DELETE CASCADE,
      "simulation_id" INTEGER NOT NULL REFERENCES "simulation"("id") ON DELETE CASCADE,
      "nbsimulation_id" INTEGER NOT NULL REFERENCES "nbsimulation"("id") ON DELETE CASCADE,
      "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      PRIMARY KEY ("article_id", "guestbook_id", "comment_id", "simulation_id","nbsimulation_id" ,"user_id")
  );

-- CREATE TABLE IF NOT EXISTS "article_comment_user" (
--     "article_id" INTEGER NOT NULL REFERENCES "article"("id") ON DELETE CASCADE,
--     "comment_id" INTEGER NOT NULL REFERENCES "comment"("id") ON DELETE CASCADE,
--     "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
--     PRIMARY KEY ("article_id", "comment_id", "user_id")
-- );
-- 
-- CREATE TABLE IF NOT EXISTS "guestbook_comment_user" (
--     "guestbook_id" INTEGER NOT NULL REFERENCES "guestbook"("id") ON DELETE CASCADE,
--     "comment_id" INTEGER NOT NULL REFERENCES "comment"("id") ON DELETE CASCADE,
--     "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
--     PRIMARY KEY ("guestbook_id", "comment_id", "user_id")
-- );

-- fin de la transaction
COMMIT;
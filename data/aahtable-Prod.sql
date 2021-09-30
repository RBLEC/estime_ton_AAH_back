
-- DATA Table --

-- En SQL on va respecter les conventions suivantes : snake case, minuscule, singulier

-- début de la transaction qui permet d'annuler le code executé en cas d'erreur au lieu que ça passe à la suite sans arrêter l'execution du fichier

BEGIN;

-- Supprime les tables si elles existent déjà, comme ça on est sûr de partir sur de bonnes bases
-- On rajoute CASCADE pour ne pas avoir de probleme de références cassées 
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "income" CASCADE;
DROP TABLE IF EXISTS "article" CASCADE;
DROP TABLE IF EXISTS "comment" CASCADE; 
DROP TABLE IF EXISTS "article_comment_user" CASCADE; -- ! on ferme avec un " ; " 

-- Création de la TABLE "utilisateur"
CREATE TABLE IF NOT EXISTS "user" ( 
    -- serial PRIMARY KEY pour in id unique
    "id" SERIAL PRIMARY KEY, 
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP NOT NULL,
    "role" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "income" (
    "id" SERIAL PRIMARY KEY, 
    "year" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "situation" TEXT NOT NULL,
    "nb_child" INTEGER NOT NULL,
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

CREATE TABLE IF NOT EXISTS "comment" (
    "id" SERIAL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP NULL DEFAULT NOW(),
    "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE,
    "article_id" INT REFERENCES "article"("id") ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "article_comment_user" (
    "article_id" INTEGER NOT NULL REFERENCES "article"("id") ON DELETE CASCADE,
    "comment_id" INTEGER NOT NULL REFERENCES "comment"("id") ON DELETE CASCADE,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    PRIMARY KEY ("article_id", "comment_id", "user_id")
);


-- fin de la transaction
COMMIT;
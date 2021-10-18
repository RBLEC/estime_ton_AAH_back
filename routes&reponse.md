# Toutes les routes de l'API

voici toute les routes dans le router

```js
//! CRUD User
router.post(`/signup`); // création d'un utiisateur
router.post(`/login`); // Login d'un utilisateur
router.post(`/refreshToken`); // refreshToken de l'utilisateur

router.get(`/users`); // listes touts les utilisateurs
router.get(`/user/:id`); // liste un utilisateur
router.get(`/userLastComment/:id`); // listes des 10 derniers commantaires de l'utilisateur
router.get(`/userLastArticle/:id`); // listes des 10 derniers articles de l'utilisateur
router.get(`/userLastGuestbook/:id`); // listes des 10 derniers messages du livre d'or de l'utilisateur
router.get(`/userLastInfosimulation/:id`); // listes des 10 dernières simulation de l'utilisateur
router.patch(`/user/:id`); // Mise a jour de l'utilisateur
router.delete(`/user/:id`); // suppréssion de l'utilisateur

//* CRUD User Retail
//! Article
router.get(`/user/:userId/articles`); // Listes tous les articles de l'utilisateur
router.get(`/user/:userId/article/:articleId`); // liste un article de l'utilisateur
router.post(`/user/:userId/article` ); // création d'un article de l'utilisateur
router.patch(`/user/:userId/article/:articleId`); // modification d'un article de l'utilisateur
router.delete(`/user/:userId/article/:articleId`); // supprésion d'un article de l'utilisateur

//! Livre d'or (guestbook)
router.get(`/user/:userId/guestbooks`); // Listes tous les guestbooks de l'utilisateur
router.get(`/user/:userId/guestbook/:guestbookId`);// liste un guestbook de l'utilisateur
router.post(`/user/:userId/guestbook`); // création d'un guestbook de l'utilisateur
router.patch(`/user/:userId/guestbook/:guestbookId`); // modification d'un guestbook de l'utilisateur
router.delete(`/user/:userId/guestbook/:guestbookId`); // supprésion d'un guestbook de l'utilisateur

//! Comment
router.get(`/user/:userId/comments`); // Listes tous les commentaires de l'utilisateur
router.get(`/user/:userId/comment/:commentId`); // liste un commentaire de l'utilisateur
router.post(`/user/:userId/article/:articleId/comment`); // création d'un commentaire pour un article de l'utilisateur
router.post(`/user/:userId/guestbook/:guestbookId/comment`); // création  d'un commentaire pour un message de l'utilisateur dans le livre d'or
router.patch(`/user/:userId/comment/:commentId`); // modification d'un commentaire de l'utilisateur
router.delete(`/user/:userId/comment/:commentId`); // supprésion d'un commentaire de l'utilisateur

//! infosimulation
router.get(`/user/:userId/infosimulations`); // Listes tous les simulations de l'utilisateur
router.get(`/user/:userId/infosimulation/:infosimulationId`);// Liste une simulations de l'utilisateur
router.post(`/user/:userId/infosimulation`); // création d'une simulations de l'utilisateur
//router.patch //! pas de mise à jour pour une simulation
router.delete(`/user/:userId/infosimulation/:infosimulationId`); // suppréssion d'une simulations de l'utilisateur

//! Lecture Article
router.get(`/articles`); // listes tous les articles
router.get(`/lastarticles`)  // listes les 10 derniers articles
router.get(`/article/:id`); // liste un article

//! Lecture Livre d'or
router.get(`/guestbooks`); // listes tous les messages du livre d'or
router.get(`/lastguestbooks`); // listes les 10 derniers messages du livre d'or
router.get(`/guestbook/:id`); // liste un message du livre d'or

//! Creation d'une simulation
router.get(`/nbsimulations`); // listes toutes les simulations
router.get(`/user/:userId/nbsimulations`); // listes et compte toutes les simulations d'un utilisateur

//! Count
router.get(`/countarticles`); // compte tous les articles
router.get(`/countguestbooks`); // compte tous les messages du livre d'or
router.get(`/countcomments`); // compte tous les commentaires
router.get(`/countusers`); // compte tous les utilisateurs
router.get(`/countnbsimulations`); // compte toutes les simulations

//! Nodemailer
router.post(`/send_message`);

//! accueil
router.get(`/`, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Bienvenu sur le serveur Back 'Estime ton AAH !' `,
  });
});

// Middleware pour gérer le cas où on a trouvé aucune route (404)
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `🧨 Service does not exist !`,
  });
});
```

## Donnée  `POST` et `PATCH` envoyer du `Front` pour la db du `Back`

### Créer un utilisateur

```js
router.post(`/signup`); // création d'un utilisateur
```

- POST http://localhost:5000/signup
- Content-Type: application/json

```json
{
  "pseudo": "cidaah2",
  "password": "atcidaah",
  "email": "regis@aah.com",
  "birthdate": "11-05-1895",
  "role": 3,
  "disability_rate": 0.8,
  "place_of_residence": true,
  "apl": true
}
```

### login user

```js
router.post(`/login`); // Login d'un utilisateur
```

- POST http://localhost:5000/login
- Content-Type: application/json

```json
{
  "pseudo": "Pseudo",
  "password": "MotdePAsse"
}
```

### Rafraichisement du Token

```js
router.post(`/refreshToken`); // refreshToken de l'utilisateur
```

- POST http://localhost:5000/refreshToken
- Content-Type: application/json
- Authorization:Bearer xxx.yyy.zzz

### création d'un article

```js
router.post(`/user/:userId/article` ); // création d'un article de l'utilisateur
```

- POST http://localhost:5000/user/:userId/article
- Content-Type: application/json
- Authorization:Bearer xxx.yyy.zzz

```json
{
  "title": "Création d'un article",
  "content": "ici le contenu des articles"
}
```

### création d'un message dans le livre d'or

```js
router.post(`/user/:userId/guestbook`); // création d'un message du livre d'or de l'utilisateur
```

- POST http://localhost:5000/user/:userId/guestbook
- Content-Type: application/json
- Authorization:Bearer xxx.yyy.zzz

```json
{
  "title": "Création d'un message du livre d'or",
  "content": "ici le contenu du message dans le livre d'or"
}
```

### création d'une simulation

! pas de mise a jours de simulation

```js
router.post(`/user/:userId/infosimulation`); // création d'une simulation de l'utilisateur
```

- POST http://localhost:5000/user/:userId/infosimulation
- Content-Type: application/json
- Authorization:Bearer xxx.yyy.zzz

```json
{
    // Data
    "year": 2001,
    "aah_amount" :903.6,
    "mva_amount" :104.77,
    "smichb" :10.25,
    "smicnbtf" :151.67,
    "ageMinimal": 20,
    "ageRetraite" : 62 ,
    "disability_rate_mini" :0.6666,
    "disability_rate_max" :0.80,
    "majorationPlafonCouple": 0.81,
    "coefPersonneACharge": 0.5,
    // Info du foyer
    "household_composition": "en couple",
    "nb_child": 9,
    "place_of_residence" : true,
    "apl": true,
    // le demandeur
    "applicant_age" :40,
    "applicant_disability" : true,
    "applicant_disability_rate" :0.8,
    "applicant_income_without_activity": 0,
    "applicant_income_with_activity":0,
    // le conjoint
    "spouse_age" :40,
    "spouse_disability" : false,
    "spouse_disability_rate" :0,
    "spouse_income_without_activity":0,
    "spouse_income_with_activity": 37000,
    // les enfants
    "child_income1": 1,
    "child_income2": 0,
    "child_income3": 0,
    "child_income4": 0,
    "child_income5": 0
}
```















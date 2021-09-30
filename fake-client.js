// ici on simule le front

const axios = require('axios');
//const { response } = require('express');

// Base des requêtes
const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

console.log('trying to login');

// stokage de refreshToken
let refresheToken;

//! instance = api

// ma route login avec les identifiants de connection
instance.post('/login', { 
  pseudo: "toto",
  password: "toto"
}).then((response) => {
  console.log('auth success =>', response.data); //* =>ok

  // intégration du token dans le headers du client
  instance.defaults.headers.common['Authorization'] = `Bearer zz${response.data.accessToken}`; //! ici token ivalide 'zz' sans il est valide
  refreshToken = response.data.refreshToken;

  //console.log('refreshToken :>> ', refreshToken);

  loadUserInfos();
}).catch((error) => {
  console.log(error.response.status);
});

function loadUserInfos() {
  console.log("load User Info");
  instance
    .get('/user/id')
    .then((response) => {
    console.log("response data => ", response.data);
  })
    .catch((error) => {
      console.log("erreur de réccupération du token", error);
      console.log("status ", error.response.status);
  });
};

// Si nous avons un status 401 avec loadUserInfo, c'est que le token n'est plus valide.
// Pour cela on utilise axios.interceptors
instance.interceptors.response.use((response) =>{
    // on reccupere toutes les réponses
    // ont les laissent passer si elle sont bonnes.
  return response;

  // si erreur
}, async (error) => {
  // Sinon on affiche le status code et on met en place le refresh
  const originalRequest = error.config;
    // On check la bonne url pour evité de bouclé dessus
    // que le status est bien 401
    // et on check si le booleen de _retry est la même requete qui déclanche l'erreur
  if (
    error.config.url != '/refreshToken' && error.response.status === 401 && originalRequest._retry !== true
  ){
    // si le refresh n'a pas fonctionné
    originalRequest._retry = true;
    if (refreshToken && refreshToken != '') {
        instance.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`;
        console.log('refresh token');
        // on fait l'apelle de la route du refresh
        await instance.post('/refreshToken').then((response) => {
          instance.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;
          // On met à jour le header
          originalRequest.headers['authorization'] = `Bearer ${response.data.accessToken}`;
        }).catch((error) => {
          console.log("erreur =>", error.response.status);
          // on defini le refresh token à null
          refreshToken = null;
        });
        // on relance la requete
        return instance(originalRequest);
    }
  }
});

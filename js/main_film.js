const apiKey = '2c6cd4ceb33666821e89ac0236f6a6e3';
let lastRequestTime = 0;

async function getRandomMovie() {
try {
const now = Date.now();
const timeSinceLastRequest = now - lastRequestTime;

if (timeSinceLastRequest < 1000 / 35) {
  // Si moins d'une seconde s'est écoulée depuis la dernière requête, attendez le temps nécessaire
  const delay = 1000 / 35 - timeSinceLastRequest;
  await new Promise(resolve => setTimeout(resolve, delay));
}

lastRequestTime = Date.now();

// Utilisons le point d'accès "https://api.themoviedb.org/3/discover/movie" avec un tri aléatoire
let page = Math.floor(Math.random() * 500) + 1; // Choisir une page aléatoire entre 1 et 500 (ajustez selon vos besoins)
const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=${page}`);
const data = await response.json();

const randomIndex = Math.floor(Math.random() * data.results.length);
const randomMovie = data.results[randomIndex];

const movieTitle = document.getElementById('movieTitle');
const movieOverview = document.getElementById('movieOverview');
const releaseDate = document.getElementById('releaseDate');
const movieImage = document.getElementById('movieImage');

console.log(movieTitle, movieOverview, releaseDate, movieImage);

document.getElementById('movieTitle').textContent = randomMovie.title;
document.getElementById('movieOverview').textContent = randomMovie.overview;
document.getElementById('releaseDate').textContent = `Date de sortie : ${randomMovie.release_date}`;

// Correction de la construction de l'URL de l'image
document.getElementById('movieImage').style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${randomMovie.poster_path})`;

// Faites apparaître movieDetails
document.getElementById('movieDetails').style.display = 'block';
} catch (error) {
console.error('Erreur lors de la récupération des données du film', error);
}
}

function showSavedMovies() {
// Récupérez le panier actuel depuis le stockage local
const cart = JSON.parse(localStorage.getItem('movieCart')) || [];

if (cart.length === 0) {
alert('Aucun film sauvegardé dans le panier.');
return;
}

let movieList = 'Films sauvegardés :\n\n';

cart.forEach((movie, index) => {
movieList += `${index + 1}. ${movie.title}\n`;
});

alert(movieList);
}



function saveToCart() {
  // Récupérez les données du film actuel
  const movieTitle = document.getElementById('movieTitle').textContent;
  const movieOverview = document.getElementById('movieOverview').textContent;
  const releaseDate = document.getElementById('releaseDate').textContent;

  // Créez un objet représentant les détails du film
  const movieDetails = {
    title: movieTitle,
    overview: movieOverview,
    releaseDate: releaseDate,
    // Vous pouvez ajouter d'autres détails du film si nécessaire
  };

  // Récupérez le panier actuel depuis le stockage local
  let cart = JSON.parse(localStorage.getItem('movieCart')) || [];

  // Ajoutez les détails du film au panier
  cart.push(movieDetails);

  // Enregistrez le panier mis à jour dans le stockage local
  localStorage.setItem('movieCart', JSON.stringify(cart));

  alert('Film ajouté au panier avec succès !');
}

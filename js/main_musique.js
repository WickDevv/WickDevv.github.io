const apiKey = '9a2b8bfa1dbf39eb0b47caa4279569fe';
let lastRequestTime = 0;

document.addEventListener('DOMContentLoaded', function () {
  // Masquer les détails de la chanson au chargement initial
  document.getElementById('songDetails').style.display = 'none';
});

async function getRandomSong() {
  try {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < 1000 / 5) {
      // Si moins d'une seconde s'est écoulée depuis la dernière requête, attendez le temps nécessaire
      const delay = 1000 / 5 - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    lastRequestTime = Date.now();

    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`);
    const data = await response.json();

    // Afficher la réponse dans la console pour diagnostic
    console.log('Réponse de l\'API Last.fm :', data);

    // Vérifier si la propriété 'tracks' existe dans la réponse
    if ('tracks' in data) {
      // Afficher les détails de la première piste dans la console
      console.log('Première piste dans la réponse :', data.tracks);

      if ('items' in data.tracks && data.tracks.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.tracks.items.length);
        const randomSong = data.tracks.items[randomIndex];

        const songTitle = document.getElementById('songTitle');
        const songArtist = document.getElementById('songArtist');
        const songListeners = document.getElementById('songListeners');
        const songPlayCount = document.getElementById('songPlayCount');
        const songDetails = document.getElementById('songDetails');    

        songTitle.textContent = randomSong.name;
        songArtist.textContent = randomSong.artists[0].name;
        songListeners.textContent = `Auditeurs : ${randomSong.listeners}`;
        songPlayCount.textContent = `Lectures : ${randomSong.playcount}`;

        songDetails.style.display = 'block';
      } else {
        console.error('Aucun morceau trouvé dans la réponse de l\'API Last.fm.');
      }
    } else {
      console.error('La propriété "tracks" est absente dans la réponse de l\'API Last.fm.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la chanson', error);
  }
}

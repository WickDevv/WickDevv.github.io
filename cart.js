document.addEventListener('DOMContentLoaded', function () {
  displayCart();
});

function displayCart() {
  // Récupérez le panier actuel depuis le stockage local
  const cart = JSON.parse(localStorage.getItem('movieCart')) || [];

  const cartList = document.getElementById('cartList');

  if (cart.length === 0) {
    cartList.innerHTML = '<p>Aucun film sauvegardé dans le panier.</p>';
  } else {
    let movieList = '<ul>';
    cart.forEach((movie, index) => {
      movieList += `<li>${index + 1}. ${movie.title} - ${movie.releaseDate}</li>`;
    });
    movieList += '</ul>';

    cartList.innerHTML = movieList;
  }
}

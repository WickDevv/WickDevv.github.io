// cart.js

document.addEventListener('DOMContentLoaded', function () {
  displayCart();
});

function displayCart() {
  // Récupérez le panier actuel depuis le stockage local
  let cart = JSON.parse(localStorage.getItem('movieCart')) || [];

  const cartList = document.getElementById('cartList');

  if (cart.length === 0) {
    cartList.innerHTML = '<p>Aucun film sauvegardé dans le panier.</p>';
  } else {
    let movieList = '<ul>';
    cart.forEach((movie, index) => {
      movieList += `
        <li>
          ${index + 1}. 
          <span>${movie.title} - ${movie.releaseDate}</span>
          <button onclick="moveUp()"> <img src="haut.png" alt="Monter"></button>
          <button onclick="moveDown()"> <img src="bas.png" alt="Descendre"></button>
          <button onclick="removeMovie(${index})"> <img src="croix.png" alt="Supprimer"></button>
        </li>`;
    });
    movieList += '</ul>';

    cartList.innerHTML = movieList;
  }
}

function moveUp(index) {
  let cart = JSON.parse(localStorage.getItem('movieCart')) || [];
  
  if (index > 0) {
    // Échangez la position du film avec celui au-dessus
    [cart[index], cart[index - 1]] = [cart[index - 1], cart[index]];
    
    // Mettez à jour le panier dans le stockage local
    localStorage.setItem('movieCart', JSON.stringify(cart));
    
    // Réaffichez le panier
    displayCart();
  }
}

function moveDown(index) {
  let cart = JSON.parse(localStorage.getItem('movieCart')) || [];
  
  if (index < cart.length - 1) {
    // Échangez la position du film avec celui en dessous
    [cart[index], cart[index + 1]] = [cart[index + 1], cart[index]];
    
    // Mettez à jour le panier dans le stockage local
    localStorage.setItem('movieCart', JSON.stringify(cart));
    
    // Réaffichez le panier
    displayCart();
  }
}

function removeMovie(index) {
  let cart = JSON.parse(localStorage.getItem('movieCart')) || [];
  
  // Supprimez le film à l'index spécifié
  cart.splice(index, 1);
  
  // Mettez à jour le panier dans le stockage local
  localStorage.setItem('movieCart', JSON.stringify(cart));
  
  // Réaffichez le panier
  displayCart();
}

function returnToMain() {
  // Redirigez vers la page principale (index.html)
  window.location.href = 'index.html';
}

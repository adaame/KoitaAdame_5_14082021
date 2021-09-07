let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitDansLocalStorage);
//----------- affichage produit panier---------------/

let objLinea = JSON.stringify(produitDansLocalStorage);
localStorage.setItem("obj", objLinea);
console.log(objLinea);
const containerProduitPanier = document.querySelector("#container-panier");
// console.log(containerProduitPanier);
//si le panier est vide : afficher le panier est vide
const recup = localStorage.getItem(
  "produit",
  JSON.parse(produitDansLocalStorage)
);
console.log(recup);

if (produitDansLocalStorage === null) {
  const affichage = `<div>
  <h2>Votre panier contient:</h2>
  <p>${recup}</p>
  </div>`;
  document
    .querySelector("#container-panier")
    .insertAdjacentHTML("afterbegin", affichage);
} else {
  const affichage = `<div>
  <h2>Votre panier est vide</h2>
  </div>`;
  document
    .querySelector("#container-panier")
    .insertAdjacentHTML("afterbegin", affichage);
}

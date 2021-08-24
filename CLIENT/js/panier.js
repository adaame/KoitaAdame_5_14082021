//RECUPERATION DE LA CHAINE DE REQUETE DANS L'URL = LE ? ET L'ID
const queryString = window.location.search; // recup l'id apres le ? dans l'url
//console.log(queryString); //chainederequete)
//Méthode 1 --slice pour suprimée une element entre un indice de début et un indice de fin
// const theId = queryString.slice(1);
// console.log(theId);

const urlSearchParams = new URLSearchParams(queryString); // constructeur qui prend en parametre mon url
console.log(urlSearchParams);
const id = urlSearchParams.get("id"); //recup mot "id" dans l'url
console.log(id);

const listeProduit = document.querySelector(".listeProduit");
function fetchData() {
  fetch(`http://localhost:3000/api/cameras/${id}`) //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
    .then((response) => {
      if (!response.ok) {
        //si reponse different de ok
        throw Error(`une erreur c'est produite`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const html = data
        .map((produit) => {
          return ` 
        <div class="listeProduit">
        <p>
        <img src="${produit.imageUrl}" alt="${produit.name}">
        </p>
        <p>Modele :${produit.name}</p>
        <a href="./produit.html?id=${produit._id}"><button id="btn">En savoir</button></a>
        <form>
        <select name="${produit.lenses}" id="lentille">
        <option value=""></option> 
        </form>
        </div>`;
        })
        .join(""); // permet d'avoir un vide entre chaque article evite la virgule du tableau
    })

    .catch((error) => {
      console.log(error);
    });
}
fetchData();

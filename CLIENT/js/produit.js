//RECUPERATION DE LA CHAINE DE REQUETE DANS L'URL = LE ? ET L'ID

//console.log(queryString); //chainederequete)
//Méthode 1 --slice pour suprimée une element entre un indice de début et un indice de fin
// const theId = queryString.slice(1);
// console.log(theId);

function getProduit() {
  const queryString = window.location.search; // recup l'id apres le ? dans l'url
  const urlSearchParams = new URLSearchParams(queryString); // constructeur qui prend en parametre mon url
  return urlSearchParams.get("id"); //retourn la valeur de l'id dans l'url
}

function oneProduit() {
  const id = getProduit();
  console.log(`ìd`, id);
  fetch(`http://localhost:3000/api/cameras/`) //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
    .then((response) => {
      if (!response.ok) {
        //si reponse different de ok
        throw Error(`une erreur c'est produite`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(`data`, data);
      data.map((produit) => {
        if (produit._id === id) {
          console.log(produit);
          const html = `
          <div class="produit">
          <p><img src="${produit.imageUrl}" alt="${produit.name}"></p>
          <p>Modele :${produit.name}</p>
          <p>Description:${produit.description}</p>
          <p>Prix:${produit.price}€</p>
          </div>
          <form>
          <label for="option-produit></label>
          <select name="option-produit" id="optionproduit">
          <option value="">${produit.lenses}</option>
          </select>
          </form>
          `;
          document
            .querySelector("#listeProduit")
            .insertAdjacentHTML("afterbegin", html);
        }
      });
    })

    .catch((error) => {
      console.log(error);
    });
}
oneProduit();
//  const isProduitSelectionne = response.find((data)=> data._id === id)
//console.log(isProduitSelectionne);

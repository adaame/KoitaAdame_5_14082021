//RECUPERATION DE LA CHAINE DE REQUETE DANS L'URL = LE ? ET L'ID
//console.log(queryString); //chainederequete)
//Méthode 1 --slice pour suprimée une element entre un indice de début et un indice de fin
// const theId = queryString.slice(1);
// console.log(theId);

function getProduitId() {
  const queryString = window.location.search; // recup l'id apres le ? dans l'url
  const urlSearchParams = new URLSearchParams(queryString); // constructeur qui prend en parametre mon url
  return urlSearchParams.get("id"); //retourn la valeur de l'id dans l'url
}

function oneProduit() {
  const id = getProduitId();
  // console.log(`ìd`, id);
  fetch(`http://localhost:3000/api/cameras/`) //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
    .then((response) => {
      if (!response.ok) {
        //si reponse different de ok
        throw Error(`une erreur c'est produite`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(`data`, data);
      data.forEach(function (produit) {
        if (produit._id === id) {
          // console.log(`produit`, produit);
          const html = `
          <div class="produit">
          <p><img src="${produit.imageUrl}" alt="${produit.name}"></p>
          <p>Modele :${produit.name}</p>
          <p>Description:${produit.description}</p>
          <p>Prix:${produit.price / 100}€</p>
          </div>
          <form id ="choix">
          <label name="option-produit" for="lenses"></label>
  
          <select name="option-produit" id="option-produit">
              <option value="
              ">--Choisiez votre produit--</option>
              </select>
          </form>
          <button id="btn-envoyer" type="submit" name="btn-envoyer"> Ajouter au panier</button>
          `;
          document
            .querySelector("#listeProduit")
            .insertAdjacentHTML("afterbegin", html);

          produit.lenses.forEach(function (lense) {
            let option = document.createElement("option");
            option.classList.add("list-group-item");
            option.textContent = lense;
            document.querySelector("#option-produit").appendChild(option);
          });
          console.log(`produit.lenses haut`, produit.lenses);

          //Ecouter du bouton puis envoi au panier
          const btn_envoyerAuPanier = document.querySelector("#btn-envoyer");

          console.log(btn_envoyerAuPanier);
          btn_envoyerAuPanier.addEventListener("click", (event) => {
            event.preventDefault();

            // recuperation choix lentille selectionné
            let reception = [];
            const choixLentille = produit.lenses;
            for (i = 0; i < choixLentille.length; i++) {
              reception += idOption = document.querySelector("#option-produit");
            }
            //récupération valeur au click
            let optionProduits = {
              nomProduits: produit.name,
              idProduitSelectionne: produit._id,
              lentille: idOption.value,
              quantite: 1,
              prix: produit.price / 100,
            };
            console.log(`valeur récupéré au click`, optionProduits);
            //---------------LocalStorage----------------//
            //produit enregistrer dans le localstorage
            //permet de lire
            let produitDansLocalStorage = JSON.parse(
              localStorage.getItem("produit")
            );
            console.log(produitDansLocalStorage);

            //Confirmation du produit avec fenetre pop up
            const popUpconfirProduit = () => {
              if (
                window.confirm(
                  `${produit.name} lentille: ${idOption.value} à bien été ajouté au pannier. Consultez le panier OK ou revenir à l'accueil ANNULUER`
                )
              ) {
                window.location.href = "./panier.html"; // si true ici
              } else {
                window.location.href = "./accueil.html"; // si annule redirection
              }
            };
            //si il y a des produit dans le localStorage
            if (produitDansLocalStorage) {
              produitDansLocalStorage.push(optionProduits); //1 ajouts dans tableau
              localStorage.setItem(
                "produit",
                JSON.stringify(produitDansLocalStorage)
              ); //dans produit on recupere tt objet ajouter au panier lisible en js
              popUpconfirProduit();
            }
            //Si pas de produit enregistere dans localStorage
            else {
              produitDansLocalStorage = [];
              produitDansLocalStorage.push(optionProduits);
              localStorage.setItem(
                "produit",
                JSON.stringify(produitDansLocalStorage) //setItem-> interface du storage qui accueil nos clé valeur ici (optionProduits) accueillit dans "produit" convertis en js avec stringify
              );
              popUpconfirProduit();
            }
          });
        }
      });
    })

    .catch((error) => {
      console.log(error);
    });
}
oneProduit();

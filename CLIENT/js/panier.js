// function loadPosts() {
//       if (this.status === 200) {
//         const response = JSON.parse(this.responseText); //parse le JSON puis on veut la reponsece  de cela
//         console.log(response);
//         let output = ``;
//         response.forEach(function (lignejson) {
//           // boucle sur chaque ligne
//           //incremente,genere chaque ligne et boucle jusqu'a la fin
//           // dans ce format
//           output += `
//                     <div id="${lignejson.id}" class="chaque_carte">
//                     <h2 class="produit">${lignejson.produit}</h2>
//                     <img src="${lignejson.image}" class="image"></img>
//                     <h3 class="prix" data-prix=${lignejson.prix}>${lignejson.prix} euros</h3>
//                     <div class="btn">Achetez moi</div>
//                     </div>`;
//         });
//         document.querySelector(`#grid`).innerHTML = output; // insert le result en innerHtml dans la
//         console.log(output);
//         let bouttons = document.querySelectorAll(".btn");
//         // for (let i = 0; i < boutton.length; i++) {
//         //   boutton[i].addEventListener("click", function () {
//         //     console.log(boutton);
//         //     if (node.parentNode) {
//         //       node.parentNode.add(node);
//         //     }
//         //   });
//         // }
//         var calcul = 0; // dehors pour eviter remise a 0

//         bouttons.forEach((boutton) =>
//           boutton.addEventListener("click", function (event) {
//             var parent = event.target.parentNode;
//             var enfant = parent.children;
//             var nomProduit = enfant[0].innerHTML;
//             var prix = enfant[2].getAttribute("data-prix");
//             var nb2 = Number(prix);
//             var produitPanier = document.querySelector(".produit-panier");
//             var prixTotal = document.querySelector(".prix-total");

//             calcul += nb2;

//             console.log(calcul);

//             let pargrapheNom = document.createElement("p");
//             let pargraphePrix = document.createElement("p");

//             pargraphePrix.innerText = prix;
//             pargrapheNom.innerText = nomProduit;
//             prixTotal.innerText = calcul;

//             produitPanier.append(pargrapheNom);
//             produitPanier.append(pargraphePrix);
//             console.log(produitPanier);
//           })
//         );
//       } else {
//         console.log(this.status);
//         alert(`Erreur`);
//       }
//     }
//   };
//   //AFFICHER LE RESULTAT (SORTE D'APPEL)
//   xhr.send();
// }
// loadPosts();

function recuperationProduit() {
  const produitPanier = getProduit();
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
          console.log(`produit`, produit);
          const html = `
          <div class="produit">
          <p><img src="${produit.imageUrl}" alt="${produit.name}"></p>
          <p>Modele :${produit.name}</p>
          <p>Description:${produit.description}</p>
          <p>Prix:${produit.price / 100}€</p>
          </div>
          <form>
          <label for="option-produit>ddd</label>
          <select name="option-produit" id="option-produit">
          <option value="produit.lenses">${produit.lenses}</option></a>
          </select>
          </form>
          <button ="btn_panier"> Ajouter au panier</button>
          `;

          document
            .querySelector("#listeProduit")
            .insertAdjacentHTML("afterbegin", html);
        }
        const btn_envoyer = document.querySelector("#btn_panier");
        console.log(` vous avez ajouté au panier le produit ${produit.name}`);
      });
    })

    .catch((error) => {
      console.log(error);
    });
}
recuperationProduit();

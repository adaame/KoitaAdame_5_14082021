// const dataApi = fetch("http://localhost:3000/api/cameras");
// dataApi
//   .then(async (responseData) => {
//     // si c'est okay on a ici accés au body
//     const data = await responseData.json(); //c'est ok donc ici on retouve notre data
//     console.log(data);
//     try {
//       for (i = 0; i < data.length; i++) {
//         let id = data[i]._id;
//         let description = data[i].description;
//         let imageUrl = data[i].imageUrl;
//         let lenses = data[i].lenses;
//         let name = data[i].name;
//         let price = data[i].price;

//         console.log(id);
//         console.log(description);
//         console.log(imageUrl);
//         console.log(lenses);
//         console.log(name);
//         console.log(price);
//       }
//       // DOM objet affichage texte et image
//       const affichage_id = document.querySelector("#id");
//       const affichage_description = document.querySelector("#description");
//       const affichage_imageUrl = document.querySelector("#imageUrl");
//       const affichage_lenses = document.querySelector("#lenses");
//       const affichage_name = document.querySelector("#name");
//       const affichage_price = document.querySelector("#price");
//       const affichage_url = document.querySelector("#url");

//       affichage_id.innerhtml = id;

//       affichage_description.innerText = description;
//       affichage_imageUrl.innerText = imageUrl;
//       affichage_lenses.innerHTML = lenses;
//       affichage_name.innerHTML = name;
//       affichage_price.innerHTML = price;
//       affichage_url.innerHTML = url;

//       const affichage_url = `<img src="${url}">`;
//       console.log(url);
//       // console.log(price);
//     } catch (error) {
//       console.log(error);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const liste = document.querySelector(".liste");
const dataApi = fetch(" http://localhost:3000/api/cameras"); //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
dataApi
  .then(async (responseData) => {
    const data = await responseData.json();
    console.log(dataApi);
    try {
      //.then data pour accedé au donnée du body ouvert si le .then du dessus est okay
      for (i = 0; i < data.length; i++) {
        let newLi = document.createElement("li");
        let newLiLentille = document.createElement("li");
        let newNameCard = document.createElement("h2");
        let newDescriptionCarte = document.createElement("p");
        let newPriceCarte = document.createElement("p");
        let newImageCard = document.createElement("img");
        let btn = document.createElement("button");
        let lentille = document.createElement("li");

        newNameCard.innerText = data[i].name; //il recupere l'info car i increment chaque ligne du tableau donc on recupéré dynamiquement .name donc ici specifiquement l'info name
        newDescriptionCarte.innerText = data[i].description;
        newImageCard.innerText = data[i].imageUrl;
        newPriceCarte.innerText = data[i].price;
        lentille.innerText = data[i].lenses;

        newLi.appendChild(newNameCard); //permet de mettre le Name dans la carte
        newLi.appendChild(newImageCard);
        newLi.appendChild(newDescriptionCarte);
        newLi.appendChild(newPriceCarte);
        newLi.appendChild(btn);
        newLiLentille.appendChild(lentille);
        liste.appendChild(newLi); // dans la ul qui à la classe liste on ajoute newLi qui contient toute les infos js
        liste.appendChild(newLiLentille);
        // menu_deroulant.appendChild(newLentille);
        console.log(newLiLentille);
      }
    } catch (error) {
      console.log(`"Désolée une petite erreur" ${error}`);
    }
  })
  .catch((error) => {
    console.log(error);
  }); // une reponse pour dire si c'es corecte ou non avec un body qui  est fermer le body contien les donnée que lon souhaite utilisée  c'est aussi une promesse d'ou le .then apres

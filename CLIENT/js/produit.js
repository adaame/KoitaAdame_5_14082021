// const liste = (document.querySelector("#liste").innerHTML = `<h1>skksks</h1>`);
// const choixLentille = document.querySelector(".choixLentille");
// const dataApi = fetch(" http://localhost:3000/api/cameras") //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
// dataApi.then(async (responseData) => {
//   const data = await responseData.json();
//   console.log(data);
//   try {
//     //.then data pour accedé au donnée du body ouvert si le .then du dessus est okay
//     const html = data.data.map(camera=>{
//       return '<p>Name :${data.name}</p>'
//     })
//     console.log(html);
//     console.log(camera);

//     }
//   } catch (error) {
//     console.log(`"Désolée une petite erreur"${error}`);
//   }
// });

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
          <div class="listePersonalise">
          <div class="listeProduit">
        <p>
        <img src="${produit.imageUrl}" alt="${produit.name}">
        </p>
        <p>Modele :${produit.name}</p>
        <a href="./panier.html?id=${produit._id}"><button id="btn">ajoutez</button></a>
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

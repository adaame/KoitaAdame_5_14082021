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

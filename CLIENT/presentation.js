const liste = document.querySelector(".liste");
fetch("http://localhost:3000/api/cameras/") //Appel à l'api qui retourne une promesse qui se résout seule si l'URL est correct
  //Une réponse pour dire si c'est correct ou non avec un body qui est fermé le body contient les données que l'on souhaite utiliser, c'est aussi une promesse d'où le.then après
  .then((data) => {
    // sont nos donnés

    //.then data pour accédé aux données du body ouvert si le .then du dessus est okay
    for (i = 0; i < data.length; i++) {
      let newLi = document.createElement("li");
      let newId = document.createElement("p");
      let newImageUrl = document.createElement("img");
      let newNameCard = document.createElement("h2");
      let newPriceCard = document.createElement("p");
      let newDescriptionCard = document.createElement("p");

      newId.id = data[i].id;
      newNameCard.innerText = data[i].name; //i incrémente dans data puis récupère le nom de manière dynamique
      newDescriptionCard.innerText = data[i].description;
      newImageUrl.innerText = data[i].img;
      newPriceCard.number = data[i].price;
      newLi.appendChild(newNameCard); //permet de mettre le Name dans un li
      newLi.appendChild(newId);
      newLi.appendChild(newImageUrl);
      newLi.appendChild(newPriceCard);
      newLi.appendChild(newDescriptionCard);
      liste.appendChild(newLi); // dans la ul qui à la classe liste on ajoute newLi qui contient toute les infos js récupéré dynamiquement qui sont chacun dans un li
    }
  });

let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
// console.log(produitDansLocalStorage);
//----------- affichage produit panier---------------/

//-------------Formulaire de commande--------//

const afficherFormulaireHtml = () => {
  //selec element du dom
  const recupPanier = document.querySelector("#container-panier");
  const structureForm = `<h1>Formulaire de contact</h1>
  <form name="myForm" action="confirmation.html" method="post">

  <form method="POST" id="myform">
  <label for="nom">Votre Nom</label>
  <input type="text" name="nom" id="nom" required>
  <span id="error-nom"></span>
    <label for="prenom">Votre Prénom</label>
    <input type="text" name="prenom" id="prenom" required>
    <span id="error-prenom"></span>
    <label for="adresse">Votre adresse</label>
    <input type="text" name="adresse" id="adresse" required>
    <span id="error-adresse"></span>
    <label for="codepostal">Votre Code Postal</label>
    <input type="text" name="codepostal" id="codepostal" required>
    <span id="error-codepostal"></span>
    <label for="ville">Votre Ville</label>
    <input type="text" name="ville" id="ville" required>
    <span id="error-ville"></span>
    <label for="email">Votre email</label required>
    <input type="text" name="email" id="email">
    <span id="error-email"></span>
    <label for="telephone">Numero de télételephone</label>
    <input type="text" name="telephone" id="telephone" required>
    <span id="error-telephone"></span>
    <br>
    <textarea name="message" id="message" cols="30" rows="10">Un cadeau? Envoyé un messeage personnalisée </textarea>
    
    <button type="submit" id="envoie" name="envoie" src="./confirmation.html">Valider le panier</button>
    </form>`;
  //injection html
  recupPanier.insertAdjacentHTML("afterend", structureForm);
};

afficherFormulaireHtml();

//selction du btn envoi formulaire
const envoiFormulaire = document.querySelector("#envoie");

//recuperation des val du formulaire pour mettre dans localStorage
envoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();
  class Formulaire {
    constructor() {
      this.prenom = document.querySelector("#nom").value;
      this.nom = document.querySelector("#prenom").value;
      this.adresse = document.querySelector("#adresse").value;
      this.ville = document.querySelector("#ville").value;
      this.cp = document.querySelector("#codepostal").value;
      this.email = document.querySelector("#email").value;
      this.telephone = document.querySelector("#telephone").value;
    }
  }
  //Appel de l'instance de class Formulaire pour fabriquer l'objet formulaireValue
  const formulaireValue = new Formulaire();

  //-------Gestion validation du formulaire -----------//
  const textAlert = (value) => {
    return `${value}: veuillez bien remplir le formulaire`;
  };
  const regExNomPrenomVille = (value) => {
    return /^([a-zA-Z ]{3,20})$/.test(value);
  };

  //test verifie si ça correspond retour un bolean
  function prenomControle() {
    const lePrenom = formulaireValue.prenom;
    if (regExNomPrenomVille(lePrenom)) {
    } else {
      alert(textAlert("Prenom"));
    }
  }

  function nomControle() {
    const leNom = formulaireValue.nom;
    if (regExNomPrenomVille(leNom)) {
      return true;
    } else {
      alert(textAlert("Nom"));
    }
  }

  //-------Fin - Gestion validation du formulaire -----------//
  if (prenomControle() && nomControle()) {
    // mettre formulaireValue dans localStorage
    localStorage.setItem("formulaireValue", JSON.stringify(formulaireValue));
  } else {
    alert(`veuillez bien remplir le formulaire`);
  }

  console.log(`formulaireValue`, formulaireValue);
  //recuperation des value du formulaire et mettre produit dans un objet pour envoyer au server
  const elmentAEnvoyer = {
    produitDansLocalStorage, //appareil selectionnée
    formulaireValue, // formulaire
  };
  console.log(`element à envoyerrr`, elmentAEnvoyer);
});

//---------mettre le contenu du localStorage dans les champs formulaire-----//

//prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formulaireValue");

// convertir la chaine de caractére en objet js
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//fonction pour que le champs du formulaire soit remplis par les donnée du localstorage si elle sont enregistré au préalable
function champsProvenantDuLocalStorage(input) {
  document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
}
champsProvenantDuLocalStorage("nom");
champsProvenantDuLocalStorage("prenom");
champsProvenantDuLocalStorage("adresse");
champsProvenantDuLocalStorage("codepostal");
champsProvenantDuLocalStorage("ville");
champsProvenantDuLocalStorage("email");
champsProvenantDuLocalStorage("telephone");

//mettre les values du localstroge dans les champs du formulaire pour pas  perdre les info si changement de pas par exemple : posibilité

// document.querySelector("#nom").value = dataLocalStorageObjet.nom;

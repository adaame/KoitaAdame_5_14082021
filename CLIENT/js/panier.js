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

    <label for="nom">Votre Nom</label><span id="error-nom"></span>
    <input type="text" name="nom" id="nom" required>
  

    <label for="prenom">Votre Prénom</label><span id="error-prenom"></span>
    <input type="text" name="prenom" id="prenom" required>
   

    <label for="adresse">Votre adresse</label> <span id="error-adresse"></span>
    <input type="text" name="adresse" id="adresse" required>
   

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
      this.nom = document.querySelector("#nom").value;
      this.prenom = document.querySelector("#prenom").value;
      this.adresse = document.querySelector("#adresse").value;
      this.ville = document.querySelector("#ville").value;
      this.codePostal = document.querySelector("#codepostal").value;
      this.email = document.querySelector("#email").value;
      this.telephone = document.querySelector("#telephone").value;
    }
  }
  //Appel de l'instance de class Formulaire pour fabriquer l'objet formulaireValue
  const formulaireValue = new Formulaire();

  //-------Gestion validation du formulaire -----------//
  const textAlert = (value) => {
    return `${value}: Veuillez bien remplir le formulaire`;
  };
  const regExNom = (value) => {
    return /^([a-zA-Z]{3,20})?([-]{0,1})?([a-zA-Z]{3,20})$/.test(value);
  };
  const regExPrenom = (value) => {
    return /^([a-zA-Z]{3,20})?([-]{0,1})?([a-zA-Z]{3,20})$/.test(value);
  };
  const regExVille = (value) => {
    return /^([a-zA-Z ]{3,20})$/.test(value);
  };
  const regExCodePostal = (value) => {
    return /^([0-9]{5})$/.test(value);
  };
  const regExEmail = (value) => {
    return /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]$/.test(value);
  };
  const regExAdresse = (value) => {
    return /^([a-z0-9*(é|è|à|ù)A-Z\d\s\-\,\#\.\+])$/.test(value);
  };
  const regExTelephone = (value) => {
    return /^[\+?\(?\d{2,4}\)?[\d\s-]{3,}$/.test(value);
  };

  //test verifie si ça correspond retour un bolean
  function nomControle() {
    const leNom = formulaireValue.nom;
    if (regExNom(leNom)) {
      document.querySelector("#error-nom").textContent = "";
      return true;
    } else {
      document.querySelector("#error-nom").textContent =
        "Veuillez remplir le champs";
      alert(textAlert("Nom"));
    }
  }

  function prenomControle() {
    const lePrenom = formulaireValue.prenom;
    if (regExPrenom(lePrenom)) {
      document.querySelector("#error-prenom").textContent = "";
      return true;
    } else {
      document.querySelector("#error-prenom").textContent =
        "Veuillez remplir le champs";
      alert(textAlert("Prenom"));
      return false;
    }
  }
  function adresseControle() {
    const leAdresse = formulaireValue.adresse;
    if (regExAdresse(leAdresse)) {
      document.querySelector("#error-adresse").textContent = "";
      return true;
    } else {
      document.querySelector("#error-adresse").textContent =
        "Veuillez remplir le champs";
      alert(textAlert("Adresse"));
      return false;
    }
  }
  function villeControle() {
    const leAdresse = formulaireValue.adresse;
    if (regExVille(leAdresse)) {
      document.querySelector("#error-ville").textContent = "";
      return true;
    } else {
      document.querySelector("#error-ville").textContent =
        "Veuillez remplir le champs";
      return false;
    }
  }

  function codePostalControle() {
    const codePostal = formulaireValue.codepostal;
    if (regExCodePostal(codePostal)) {
      document.querySelector("#error-codepostale").textContent = "";
      console.log("TRUE");
      return true;
    } else {
      document.querySelector("#error-codepostale").textContent =
        "-- le code postal doit être composé de 5 chiffres";
      return false;
    }
  }
  function emailControle() {
    const email = formulaireValue.email;
    if (regExEmail(email)) {
      document.querySelector("#error-email").textContent = "";
      console.log("TRUE");
      return true;
    } else {
      document.querySelector("#error-email").textContent =
        "Veuillez indiquer une adresse mail correcte";
      return false;
    }
  }

  function telephoneControle() {
    const telephone = formulaireValue.telephone;
    if (regExTelephone(telephone)) {
      document.querySelector("#error-telephone").textContent = "";
      console.log("TRUE");
      return true;
    } else {
      document.querySelector("#error-telephone").textContent = "";
      return false;
    }
  }

  //-------Fin - Gestion validation du formulaire -----------//
  if (
    nomControle() &&
    prenomControle() &&
    adresseControle() &&
    villeControle() &&
    codePostalControle() &&
    emailControle() &&
    telephoneControle()
  ) {
    // mettre formulaireValue dans localStorage
    localStorage.setItem("formulaireValue", JSON.stringify(formulaireValue));
  } else {
    alert(`Veuillez bien remplir le formulaire`);
  }

  console.log(`formulaireValue`, formulaireValue);
  //recuperation des value du formulaire et  des produits les mettre dans un objet à envoyer vers le server
  const elmentAEnvoyer = {
    produitDansLocalStorage, //appareil selectionnée
    formulaireValue, // formulaire
  };
  console.log(`element à envoyer`, elmentAEnvoyer);

  //Envoi de l'objet elmentAEnvoyer vers le serveur--

  const prom1 = fetch("http://localhost:3000/api/cameras/", {
    method: "POST",
    body: JSON.stringify(elmentAEnvoyer),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log(prom1);
});

//---------mettre le contenu du localStorage dans les champs formulaire-----//

//prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formulaireValue");

// convertir la chaine de caractére en objet js
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//fonction pour que le champs du formulaire soit remplis par les donnée du localstorage si elle sont enregistré au préalable
function champsProvenantDuLocalStorage(input) {
  if (dataLocalStorageObjet == null) {
    console.log(`la valeur du localStorage est nul`);
  } else {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
  }
}
champsProvenantDuLocalStorage("#nom");
champsProvenantDuLocalStorage("prenom");
champsProvenantDuLocalStorage("adresse");
champsProvenantDuLocalStorage("codepostal");
champsProvenantDuLocalStorage("ville");
champsProvenantDuLocalStorage("email");
champsProvenantDuLocalStorage("telephone");

//mettre les values du localstroge dans les champs du formulaire pour pas  perdre les info si changement de pas par exemple : posibilité

// document.querySelector("#nom").value = dataLocalStorageObjet.nom;

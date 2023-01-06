// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

//Loop dans le tableau pieces pour créer chaque piece dans le DOM
pieces.forEach((piece) => {
  //création d'une balise article pour chacun des produits
  const cardPiece = document.createElement("article");
  //image du produit
  const imgPiece = document.createElement("img");
  imgPiece.src = piece.image;
  //nom du produit
  const namePiece = document.createElement("h2");
  namePiece.innerText = piece.nom;
  //prix du produit + variation de prix de € à €€€
  const pricePiece = document.createElement("p");
  pricePiece.innerText = `Prix: ${piece.prix} € (${
    piece.prix <= 35 ? "€" : "€€" && piece.prix >= 60 ? "€€€" : "€€"
  })`;
  // description du produit
  const descriptionPiece = document.createElement("p");
  descriptionPiece.innerText =
    piece.description ?? "Pas de description disponible actuellement.";
  //catégorie du produit
  const categoriePiece = document.createElement("p");
  categoriePiece.innerText = piece.categorie ?? "Hors-catégorie";
  // disponibilité du produit
  const dispoPiece = document.createElement("p");
  dispoPiece.innerText = `${
    piece.disponibilite === "non" ? "Rupture de stock" : "En stock"
  }`;

  //affichage sur le DOM
  const sectionFiches = document.querySelector(".fiches");
  sectionFiches.appendChild(cardPiece);
  cardPiece.appendChild(imgPiece);
  cardPiece.appendChild(namePiece);
  cardPiece.appendChild(pricePiece);
  cardPiece.appendChild(categoriePiece);
  cardPiece.appendChild(descriptionPiece);
  cardPiece.appendChild(dispoPiece);
});

//création d'un bouton de tri sur le DOM après l'affichage des articles
const sortBtn = document.createElement("button");
sortBtn.setAttribute("class", "btn-trier");
sortBtn.innerText = "Trier par prix croissant";
//affichage du boutton sur le DOM
document.querySelector(".filtres").appendChild(sortBtn);
//ajout de l'écoute d'evenement "click" pour effectuer la fonction de tri par prix croissant
sortBtn.addEventListener("click", function () {
  const ordonnedPieces = Array.from(pieces);
  ordonnedPieces.sort(function (a, b) {
    return a.prix - b.prix;
  });
});

//création d'un bouton de filtre sur le DOM après l'affichage des articles
const filterBtn = document.createElement("button");
filterBtn.setAttribute("class", "btn-filter");
filterBtn.innerText = "Filtrer les pièces non abordables";
//affichage du boutton sur le DOM
document.querySelector(".filtres").appendChild(filterBtn);
//ajout de l'écoute d'evenement "click" pour effectuer la fonction de filtrage des prix >35€
filterBtn.addEventListener("click", function () {
  const filteredPieces = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
  console.log(filteredPieces);
});

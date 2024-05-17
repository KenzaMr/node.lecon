//Exercice:
//Créer un fichier personne.js avec une fonction affichePersonne:
//La fonction prend un paramétre un objet avec un nom et prenom
//Afficher les noms et prenoms dans la console
// Utilisier la fonction dans index.js 

 export function affichePersonne(personne){
console.log(personne.nom)
console.log(personne.prenom);}
// module.exports={
//     affichePersonne:affichePersonne,
// }
// Correction
//module.exports={ affiche: affichePersonne}
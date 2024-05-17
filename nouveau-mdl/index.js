// const {add} = require("./math")
import {add} from "./math.js"
import { affichePersonne } from "./personne.js"
//Importer read line
import readline from "readline"
//Lire aussi le contenur d'un fichier en l'important 
import fs from "fs"
// const {affichePersonne}= require("./personne")
console.log("Hello,Word!")
console.log(add(5,3))
console.log(affichePersonne({nom:"Mroudjae", prenom:"Kenza"}))
// affiche({nom:"Mroudjae", prenom:"Kenza"})
//  Lire le contenu d'un fichier
// fs.readFile("./user.txt",(err,contenu)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(contenu.toString())
//     }
// })
//On créer l'interface 
const inter = readline.createInterface({input: process.stdin,
    output:process.stdout
})
// inter.question('Quel est votre nom? ', (nom) =>{
//     console.log(nom)
//     inter.close()
// })
// Utiliser readline pour demander à l'utilisateur d'entrer un nom
// Créer un fichier avec le nom donné 
// const inter = readline.createInterface({input: process.stdin,
//     output:process.stdout
// })
// inter.question('Quel est votre nom? ', (fichier) =>{
//     fs.appendFile(`./${fichier}`, "Kenza la bg", (err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             console.log("Ajout réussi")
//         }
//     })
//     console.log(fichier)
//     inter.close()
// })
//Correction 
// Interface.question("Quel est le nom du fichier?", (fileNme) =>{
//     fs.writeFile("./" + fileNme,"", (err)=>{
//         if(err){
//             console.log('Création du fichier échoué')
//         }else{
//             console.log("Création du fichier avc succés")
//         }
//         inter.close()
//     })
// })

// Créer un dossier à travers un dossier déja créer
inter.question("Quel est nom du projet ?", (projectName)=>{
    fs.cp("./templates","./"+projectName,{recursive: true}, (err)=>{
        if(err){
            console.log("La créaton a échoué")
        }else{
            console.log("La création est réussi")
        }
        inter.close()
    })
})

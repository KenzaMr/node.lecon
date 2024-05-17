import { error } from "console";
import express from "express";
import fs from "fs";
import { postRouteur } from "./routes/post-routes.js";

const kenza = express();
kenza.use(express.json()) //Ce middleware renvoie les données du corps en json (elle parse le body Json)
kenza.use("/api/post", postRouteur);
kenza.use(afficheInfo);
function afficheInfo(req, rep, next) { //Création d'un middleware
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}

kenza.get("/api/todos", function (req, res) {
  fs.readFile("./src/data/todos.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const contenu = data.toString();
      return res.json(JSON.parse(contenu));
    }
  });
});

kenza.post("/api/users", function (req, res) {
  console.log("hello");
  res.end("Bonjour utilisateur");
  // rse.json({data:"salut"})
});
kenza.listen(201, function () {
  console.log("Vote serveur est sur le port 201");
});
// Exercice:
// Ajouter un handler pour l'url "/api/users" avec la methode POST
//et retourne "bonjour utilisateur"
// Tester si elle fonctionne avec Postman

// Exercice:
// Ajouter un handler pour l'url /api/todos avec method GET.
// 1. Lire le conténu du fichier todos.json
// 2. Retourner les contenus Json dans réponse
// 3. Tester la route avec Postman

//Pour récupérer des données dans l'URL
// /api/user?nom=Mroudjae&prenom=Kenza
kenza.get("/api/user", (req, res) => {
  const data = req.query;
  if (!data.prenom || !data.nom) {
    return res.status(400).json({ error: "Nom et prenom obligatoire" });
  }
  res.json(data);
});

// Exercice:
// Ajouter un handler pour l'url "/api/todo":
// /api/todo?id=2
// /api/todo?id=4
// Récuperer la liste des todos
// Si la todo n'existe pas , retourner un 404
// Sinon Retourner en JSON la todo avec l'id fournit
kenza.get("/api/todo", (req, res) => {
  // Ici on ajouter un handler
  const liste = req.query; //On récupére les données de l'URL en l'a reliant à une variable
  console.log(liste.id);
  if (!liste.id) {
    // On a créer une condition si l'URL ne contient pas  un ID
    return res // Alors ils retournent un message d'erreur
      .status(404)
      .json({ error: "id obligatoire" });
  }
  //Ici on veut lire un fichier Json ranger dans un autre dossier
  fs.readFile("./src/data/todos.json", (err, data) => {
    const contenu = data.toString(); //On converti en chaine de carractére la data qui elle représente l'objet
    const sauvegarde = JSON.parse(contenu); //On converti notre chaine de caractére en objet JSON
    console.log(sauvegarde);
    //const todoData= data.todos.find((todo)=>)
    const result = sauvegarde.todos.filter((element) => element.id == liste.id); //On utilise la méthode filter pour filtrer le tableau de l'objet qui a pour paramétre une fonction fléché qui va vérifier si l'id de l'url est présent dans le tableau todos
    if (result == "") {
      return res.status(404).json({ error: "Cet id n'existe pas !" });
    }
    if (result) {
      console.log(result);
      return res.json(result);
    } else {
      return res.status(404).json({ error: "Rien" });
    }
  });
});

// Exercice:
// Ajouter un handler pour l'url "/api/todo" avec la method DELETE:
// /api/todo?id=2
// /api/todo?id=4
// Récuperer la liste des todos
// Si la todo n'existe pas , retourner un 404
// Sinon SUpprimer la todo du tableau
// Ecrire dans le ficher la nouvelle liste
// Retourner un message: Tache supprimée
kenza.delete("/api/todo", (req, res) => {
  const dataUrl = req.query;
  if (!dataUrl.id) {
    return res.status(404).json({ error: "id obligatoire" });
  }
  fs.readFile("./src/data/todos.json", (err, data) => {
    const contenu = data.toString();
    const sauvegarde = JSON.parse(contenu);
    console.log(sauvegarde);
    const result = sauvegarde.todos.filter(
      (element) => element.id == dataUrl.id
    );
    if (result == "") {
      return res.status(404).json({ error: "Cet id n'existe pas !" });
    }
    if (!result) {
      return res.status(404).json({ error: "Rien" });
    } else {
      const nvxTableau = sauvegarde.todos.filter(
        (element) => element.id != dataUrl.id
      );
      console.log("Tache supprimé avec succés !");
      console.log(result);
      console.log(nvxTableau);
    }
    // Filter
    // const fichier="J'écris pour écrire"
    // fs.writeFile("./src/data/todos.json",fichier, (err)=>{
    //     if(err){
    //         console.log(err)
    //     }else{

    //     }
    // })
  });
});
//Correction
// kenza.delete("/api/todo", (req,res) =>{
//     const dataUrl= req.query
//     if (!dataUrl.id){
//         return rep.status(500).json({error:"ID obligatoire"})
//     }
//     const contenu= fs.readFileSync("./src/data/todos.json")
//     const contenuString= contenu.toString()
//     const data= JSON.parse(contenuString)
//     data.todos= data.todos ((todo) => todo.id != dataURL.id);
//     fs.writeFileSync("./src/data/todos.json", JSON.stringify(data));

//     return rep.json({message:"Tache suprimmée"})
// })

// * Create a middleware to have it automatically check the url data (request) and have it change the buffer into a string then a js object:
function verifyId(req, res, next) {
  const dataUrl = req.query;
  if (!data) {
    return res.status(400).json({ error: "ID mandatory" });
  }
  next();
}
//* Then use it in the http method:
kenza.get("/api/todos", verifyId, (req, res) => {
  // content of the http method
});

// Exercice: 
// Ajouter une todo a la liste 
// Ajouter un handler POST qui recoit dans corps de la requete: title et date
// 1. Verifier si title et date est envoyé sinon retourner un erreur
// 2. Generer un id aleatoire
// 3. Ajouter la nouvelle tache dans le fichier todos.json
// 4. Retourner la nouvelle tache ajoutée dans la réponse

kenza.post("/api/todos", (req, rep) => {
  const data = req.body;

  if (!data.title || !data.date) {
    return rep
      .status(400)
      .json({ error: "Titre et date obligatoire" });
  }

  const dataTodos = fs.readFileSync("./src/data/todos.json");
  const todosObject = JSON.parse(dataTodos.toString());
  todosObject.todos.push({
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    date: req.body.date,
  });

  fs.writeFileSync(
    "./src/data/todos.json",
    JSON.stringify(todosObject) //Transformation de Json en objet
  );

  return rep.json({
    message:"Tache ajouté"
  });
});
// Exercice: Modifier une todo dans la liste
// /api/todos/2
// /api/todos/3
// 0. Ajouter un handler PUT qui recoit dans corps de la requete: title et date
// 1. Verifier si title et date est envoyé sinon retourner un erreur
// 2. récuperer toutes les taches
// 3. Mettre la tache à jour
// 4. Retourner la tache mise à jour ajoutée dans la réponse
// kenza.put("/api/todos",(req,rep)=>{
//   const data=req.body
//   if(!data.title || !data.date){
//     return rep.status(400).json({error:"Titre et date obligatoiress"})
//   }
//   const lecture=fs.readFileSync("./src/data/todos.json") //
//   const date=JSON.parse(lecture.toString())
//   const position=date.todos.findIndex((element)=>{
//     return element.id==data.id
//   })
//   console.log(position)
//   if(position == -1){
//     return rep.status(400).json({error:"Tâche introuvable"})
//   }
  
// })
//Correction
kenza.put("/api/todos/:id",(req,res)=>{
  const id=req.params.id
  const newDta=req.body
  if(!newDta.title || !newDta.date){
        return res.status(400).json({error:"Titre et date obligatoiress"})
      }
  const todoData=fs.readFileSync("./src/data/todos.json")
  const todoObject=JSON.parse(todoData.toString())
  const positionTache= todoObject.todos.findIndex((todo)=>todo.id ==id)
  todoObject.todos[positionTache].title=newDta.title
  todoObject.todos[positionTache].date=newDta.date
  fs.writeFileSync("./src/data/todos.json",JSON.stringify(todoObject))
  return res.json({message:"Tâche modifiée"})
})
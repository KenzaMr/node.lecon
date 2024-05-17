import express from "express";
export const postRouteur = express.Router();
// /api/posts
const post=[
    {
        id:"a",
        title:"aaaaaa"
    },
    {
        id:"b",
        title:"bbbbbbb"
    }
]
postRouteur.get("/", (req, res) => {
  res.end("bjr");
});
postRouteur.get("/:id", (req, res) => {
  const id = requete.params.id;
  const article = post.find((post) => post.id == id);
  return response.json(article);
});
postRouteur.post("./",(req,res)=>{
const data=req.body
console.log(data)
})
// Exercice 2:
// 1. Ajouter un route "GET" sur l'url "/"
// 2. Lire la doc de mongoose pour apprendre a récuperer tous les document du collection.
// 3. Utiliser le model pour récuperer toutes les todos de la DB
// 4. Retourner la liste de toutes les todos. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

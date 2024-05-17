import http  from "http";
import url from "url"
import querystring from "querystring"
// const server= http.createServer((req, res)=>
// {if(req.url ==="/posts"){
//     if(req.method ==="GET"){
//         res.end("Tous les articles")
//         return
//     }
//     if(req.method === "POST"){
//         res.end("Créer un article")
//         return
//     }
// }
// res.end("bonsoir")
// })
const server= http.createServer((req,res)=>{
    // Transforme la chaine de caractére URL en objet JS
    const monUrl= url.parse(req.url)
    // Transforme la chaine de caractére des paramétred d'URL en objets JS 
    // "username=knz&lastname=772" =>{username:"knz", lastname:"772"}
    const dataUrl= querystring.parse(monUrl.query)
    console.log(dataUrl.username)
    res.end("bonsoir")
})
server.listen(201)
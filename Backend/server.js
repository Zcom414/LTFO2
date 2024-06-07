import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import router from "./routes/router.js"
import cors from "cors"
import mongoose from "mongoose";
import path from "path";
import { SUCCESS_ADD , FAILED_ADD } from "./utils/serverHandling.js";
import multer from "multer";
import upload from "./middlewares/multer.js";

// import upload from "./middlewares/multer.js";

dotenv.config()

// Je créé une application express
const app = express();

// Je connecte avec ma DB
connectDB

// Pour lire le contenu du fichier .env
dotenv.config();

app.post('/upload', upload.single('file'),(req, res) =>{
    const file = new File({
        filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path,
    size: req.file.size,
    mimetype: req.file.mimetype
    })
    file.save()
    .then(() => res.status(200).json({message : SUCCESS_ADD}))
    .catch(() => res.status(500).json({message : FAILED_ADD}))
})


app.use(cors())
app.use(express.json()) // Pour convertir la req.body qui est en json
app.use(express.urlencoded({extended: true})) // Pour déchiffrer la méthode POST
app.use(express.static("public")) // Pour créer des routes des fichiers à l'intérieur du dossier



// Pour que tous mes routeurs commencent par le préfixe "api"
// Exemple: http://localhost:9000/api/...

app.use("/api", router)


app.listen(process.env.PORT , () => {
    console.log(`Server is running: ${process.env.PORT}`);
})
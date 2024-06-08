import express from "express"
import upload from "../middlewares/multer.js"
import { isLogged, isAuthorized } from "../middlewares/auth.js"
import { addRundown, getAllRundowns, getOneRundowns, editRundowns } from "../controllers/rundownController.js"

const rundownRouter = express.Router()

// Route d'ajout pour les nouvelles Rundowns
rundownRouter.post("/new", isLogged , isAuthorized(["admin"]), upload.single(""), addRundown)

//Route de récupération de tous les Rundowns
rundownRouter.get("/", getAllRundowns)

//Route pour récupérer UN SEUL Rundowns
rundownRouter.get("/:id" , getOneRundowns)

// Route de modif pour la Rundowns
rundownRouter.put("/edit/:id", isLogged , isAuthorized(["admin" , "modo"]), upload.single(""), editRundowns)

// // Route de suppression 
// rundownRouter.delete("/delete/:id" , isLogged ,isAuthorized (["admin"]), deleteRundowns)
 export default rundownRouter
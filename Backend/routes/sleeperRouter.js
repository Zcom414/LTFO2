import express from "express"
import { addSleeper, editSleeper, getAllSleepers, getOneSleeper, deleteSleeper } from "../controllers/sleeperController.js"
import upload from "../middlewares/multer.js"
import { isLogged, isAuthorized } from "../middlewares/auth.js"

const sleeperRouter = express.Router()

// Route d'ajout pour les nouveaux sleeper
sleeperRouter.post("/new", isLogged , isAuthorized(["admin"]), upload.single(""), addSleeper)

//Route de récupération de tous les sleepers
sleeperRouter.get("/", getAllSleepers)

//Route pour récupérer UN SEUL sleeper
sleeperRouter.get("/:id" , getOneSleeper)

// Route de modif pour le sleeper
sleeperRouter.put("/edit/:id", isLogged , isAuthorized(["admin" , "modo"]), upload.single(""), editSleeper)

// Route de suppression 
sleeperRouter.delete("/delete/:id" , isLogged ,isAuthorized (["admin"]), deleteSleeper)
export default sleeperRouter
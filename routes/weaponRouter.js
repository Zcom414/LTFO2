import express from "express"
import { isAuthorized, isLogged } from "../middlewares/auth.js"
import { addWeapons } from "../controllers/weaponControllers.js"

const weaponRouter = express.Router()

// Route d'ajout pour les nouveaux sleeper
weaponRouter.post("/new", isLogged , isAuthorized(["admin"]), addWeapons)

export default weaponRouter
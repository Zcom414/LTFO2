import express from "express";
import userRouter from "./userRouter.js";
import sleeperRouter from "./sleeperRouter.js"
import weaponRouter from "./weaponRouter.js";
import rundownRouter from "./rundownRouter.js";

const router = express.Router();

// J'appelle mes routers
//Utilisateurs 
router.use("/users" , userRouter)

//Sleepers
router.use("/sleepers" , sleeperRouter)

//Weapons
router.use("/weapons" , weaponRouter)

//Rundowns
router.use("/rundowns", rundownRouter)



export default router
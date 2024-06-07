import express from "express";
import {getAllUsers, register, login, resetPassword, updateOneUser, deleteOneUser, getOneUser, checkUser} from "../controllers/userController.js"
import {isLogged, isAuthorized } from "../middlewares/auth.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router();

// Ma routes commence par http://localhost:9000/api/users

userRouter.post("/register", register)
userRouter.get("/check", isLogged, isAuthorized(["admin", "user"]), checkUser)
userRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteOneUser)
userRouter.put("/edit/:id", isLogged, isAuthorized(["admin", "user"]), upload.single("image"), updateOneUser)
userRouter.put("/reset-password", isLogged, isAuthorized(["admin", "user"]), resetPassword)
userRouter.post("/login", login)
userRouter.get("/:id", isLogged, isAuthorized(["admin", "user"]),getOneUser )
userRouter.get("/",  isLogged , isAuthorized(["admin"]) ,getAllUsers)

export default userRouter;
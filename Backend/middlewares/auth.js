import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js"
dotenv.config();

export const isLogged = (req, res, next) => {
    
    const authToken = req.headers.authorization;
    
    
    // J'extrais le token du headers de la requête
    const token = authToken && authToken.split(" ")[1]
    // console.log(authToken);
    // console.log(authToken.split(" "));
    
    if(!token){
        return res.status(401).json({message: "Vous n'êtes pas authentifié"})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
            return res.status(403).json({message: "Token invalide"})
        }
        
        // Je créé un nouveau champ (clé) dans la REQ
        
        req.userId = decoded.id; // L'ID de la personne connectée
        next();
    }
    
    )
    
}

export const isAuthorized = (roles) => {
    return async (req, res, next) =>{
        
        const user = await User.findById(req.userId)
        
        if(!user){
            return res.status(404).json({message: "Utilisateur introuvable"})
        }
        
        
      
        // Gestion des différents rôles
        if(!roles.includes(user.role)){
            return res.status(403).json({message: "Vos permissions sont insuffisantes pour accéder à la ressource"})
        }
        
        next();
    }
}
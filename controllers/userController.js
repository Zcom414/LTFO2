import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { STATES } from "mongoose";

dotenv.config();

//Page qui récupère tous les utilisateurs de notre application
export const getAllUsers = async (req, res) => {
    try {
        
        // ON VA EXCLURE LE PASSWORD
        const users = await User.find({}).select("-password")
        
        res.status(200).json(users)
        
        
    } catch (e) {
        res.status(400).json({message:"Impossible de récup les utilisateurs"})
    }
}

export const getOneUser = async (req, res) => {
    try {
        const {id} = req.params; 
        
        // req.userId = que l'utilisateur qui est connecté
    
        const currentUser = await User.findById(req.userId)
        const searchUser = await User.findById(id)
    
        // Si l'utilisateur veut accéder à un profil qui n'est pas le sien (UNIQUEMENT SI IL A LE ROLE USER) 
        if(currentUser.role === "user" && currentUser.id !== searchUser.id){
            return res.status(403).json({message: "Accès refusé!"})
        }       
      
        const user = await User.findById(id)
        
        res.status(200).json(user)
        
    } catch (e) {
        res.status(400).json({message: "Impossible de récupérer l'utilisateur"})
    }
}

// Page inscription
export const register = async (req, res) => {
    try {
  
        const { username, email, password } = req.body; 
        
        // PWD: 1 Maj, 1M, 1caractère spé, 1 chiffre entre 8 et 55 caractères
        // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
        
        // Sécurité
        
        if(username.trim() === "" 
        || email.trim() === ""
        || password.trim() === ""){
            return res.status(400).json({message: "Veuillez remplir tous les champs"})
        }

        //Permet de savoir si un utilisateur à déjà ce pseudo
        const verifUsername = await User.findOne({username})
        if (verifUsername){
            return res.status(400).json({message: "Ce pseudo est déjà utiliser"})
        }
        
        // Permet de savoir si l'utilisateur est déjà inscrit
        const verifEmail = await User.findOne({email})
      
        if(verifEmail){
            return res.status(400).json({message: "Cet email est déjà enregistré"})
        }
    
        // Vérification du MDP respectant la regex
        if(!checkPwd.test(password)){
            return res.status(400).json({message: "Le mot de passe ne respecte pas les conditions"})
        }
    
        const newUser = new User({
            email, 
            username,
            password
        })
        
        // Méthode similaire au hook pre
        const salt = await bcrypt.genSalt(10) // 2e10
        newUser.password =  await bcrypt.hash(password, salt)
    
      
        // IL VA EXECUTE LE HACHAGE DE MOT DE PASSE AVANT DE SAUVEGARDER EN BDD
        // LE HOOK PRE SERA EXECUTE
        newUser.save()
      

        res.status(200).json({message: "Compte créé avec succès"})        
        
    } catch (e) {
        res.status(400).json({message: "Impossible de créer un compte"})
    }
   
}



// bcrypt cryptojs argon2
//Page de connexion
export const login = async (req, res) => {
    try {
        console.log("Request body:", req.body)
        const {email, password} = req.body;
        
        const user = await User.findOne({email})
        
        console.log(req.body)

        if(!user){
            return res.status(404).json({message: "Aucun utilisateur enregistré avec ce mail"})
        }
        
        const isValidPWd = bcrypt.compareSync(password, user.password)
        //Si l'utilisateur se trompe de mot de passe
        if(!isValidPWd){
            
            return res.status(401).json({message: "Mot de passe incorrect"})
        }
        
        // req.session.isLogged = true

        // Je vais créer mon token, si le MDP est correcte
        let token;
        try {
            token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
            console.log("Token generated:", token);
        } catch (e){
            console.error("Erreur lors de la génération du token", e)
            return res.status(500).json({message : "Erreur lors de la génération du token "})
        }

        // ON RENVOIE TOUT SAUF LE MOT DE PASSE /!\
        res.status(200).json({
            _id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            token // Il faut renvoyer au client le TOKEN
        })
        
    } catch (e) {
        res.status(401).json({message: "Impossible de se connecter"})
        console.error("Impossible de se connecter", e)
    }
}

// Changement de mot de passe

export const resetPassword = async (req, res) => {
    try {
        
        const {password} = req.body
        
        if(password.trim() === "") {
            return res.status(400).json({message: "Veuillez entrer un mot de passe"})
        }
        
        
        // PWD: 1 Maj, 1M, 1caractère spé, 1 chiffre,  entre 8 et 55 caractères
        // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
          
          // Vérification du MDP respectant la regex
        if(!checkPwd.test(password)){
            return res.status(401).json({message: "Le mot de passe ne respecte pas les conditions"})
        }
        
        // Il ne faut pas oublier de hacher le MDP avant de le resauvegarder
          const salt = await bcrypt.genSalt(10) // 2e10
        const hashedPassword =  await bcrypt.hash(password, salt)
        
        await User.findByIdAndUpdate(req.userId, {password: hashedPassword})
        
        res.status(200).json({message: "Mot de passe changé avec succès"})
        
    } catch (e) {
        console.log(e)
        res.status(401).json({message: "Erreur lors de la modification du mot de passe", error: e})
    }
}


export const updateOneUser = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        const {username, email} = req.body; 
        
        // Sécurité
        if(username || email ){ 
            if(username && username.trim() === "" || email && email.trim() === ""){
                return res.status(400).json({message: "Veuillez remplir les champs à modifier !"})
            }
        }
        
        const editUser = {
            username, 
            email,
            // image: req.file ? req.file.filename : "default-profil.jpg"
            image:  req.file && req.file.filename  // Condition si l'utilisateur ne change pas d'image pour conserver l'ancienne
        }
        
     
        await User.findByIdAndUpdate(id, editUser )
        
        res.status(200).json({message: "Profil bien mis à jour"})
        
        
    } catch (e) {
        res.status(401).json({message:"Impossible de mettre à jour le profil"})
    }
}

export const deleteOneUser = async (req, res) => {
    try {
        
        const {id} = req.params; 
        
        // Vérification que l'admin connecté ne puisse pas se supprimer lui même
        if(id === req.userId){
            return res.status(401).json({message: "Vous ne pouvez pas supprimer votre propre compte (ADMIN)"})
        }
        await User.findByIdAndDelete(id)
        
        res.status(200).json({message: "Supression effectuée"})
        
        
    } catch (e) {
        res.status(400).json({message:"Suppression imposible"})
    }
}

// Permet de vérifier qui est l'utilisateur connecté.
export const checkUser = async (req, res) => {
    try {
        
       // req.userId // Récupérer l'utilisateur qui est connecté ! 
       
       // On ne renvoie pas JAMAIS le mot de passe
       const user = await User.findById(req.userId).select("-password")
            //   const user = await User.findOne({_id: req.userId}).select("-password")
        
        res.status(200).json(user)
        
        
    } catch (e) {
        res.status(400).json({message: "Erreur lors de la vérification"})
    }
}
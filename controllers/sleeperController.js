import Sleeper from "../models/sleeperModel.js"
import { FAILED_GET, FAILED_POST, FAILED_EDIT , FAILED_DELETE } from "../utils/errorHandling.js"
import { BOSS, COMMON, UNIQUE } from "../utils/sleepersType.js"
import { SUCCESS_POST , SUCCESS_EDIT, SUCCESS_DELETE } from "../utils/successHandling.js"

// Controller pour récupérer tout les doc de la collec "Sleepers"
    export const getAllSleepers = async (req, res) => {
        try {

            const sleepers = await Sleeper.find({})

            //Statut : 200 
            res.status(200).json(sleepers)
        }

        catch (e) {
            res.status(400).json({message: {FAILED_GET}})
        }
    }

// Controller pour créer un document dans la collection "Sleeper"
    export const addSleeper = async (req , res) => {
        try{
            console.log(req.file)
            const {type, movements , detection_type, image } = req.body

        
            // Sécurité
            if(
               type.trim() === ""
            || movements.trim() === ""
            || detection_type.trim() === ""
            || image.trim() === ""
        ){
            return res.status(400).json({message : {FAILED_POST}})
        }
        
        let sleeperType;
        //Précision du type en ajout
        if (COMMON.includes(type)){
            sleeperType = {common: type}
        } else if (UNIQUE.includes(type)){
            sleeperType = {unique: type}
        } else if (BOSS.includes(type)){
            sleeperType = {boss: type}
        }
        
        console.log(sleeperType)
         
        const newSleeper = new Sleeper({
            type: sleeperType,
            movements,
            detection_type,
            image : req.file && req.filename,
        })
            //Sauvegarder le newSleeper
            await newSleeper.save()

            res.status(200).json({message : {SUCCESS_POST}})
        }catch (e) {
            console.log(e)
            res.status(400).json({message : {FAILED_POST}})
        }
    }

// Controller pour récupérer un document dans la collection "Sleeper"
    export const getOneSleeper = async (req , res) => {
        try{
            // Récupération du paramètre dynamique dans l'URL
            const {id} = req.params
            const sleeper = await Sleeper.findById(id)

            res.status(200).json(sleeper)
        }

        catch (e){
            console.log(e)
            res.status(400).json({message: {FAILED_GET}})
        }
    }

// Controller pour modifier un document dans la collection "Sleeper"
    export const editSleeper = async (req , res) => {
        try {  
            const {id} = req.params
            const {type , movements , detection_type , image} = req.body

            let sleeperType;
            // Tableau d'enum : précision du type 
            const common = ["Striker" , "Shooter" , "Scout" , "Giant" , "Giant Shooter" , "Hybrid"]
            const unique = ["Charger" , "Giant Charger" , "Charger Scout" , "Shadow" , "Giant Shadow" , "Shadow Scout" , "Baby Striker" , "Flyer" , "GiantFlyer" , "Snatcher"]
            const boss = ["Mother" , "Big Mother" , "Tank" , "Immortal" , "Kraken"]
     
            //Précision du type en ajout
        if (common.includes(type)){
            sleeperType = {common: type}
        } else if (unique.includes(type)){
            sleeperType = {unique: type}
        } else if (boss.includes(type)){
            sleeperType = {boss: type}
        }
        console.log(req.file)

            const editSleeper = { 
            type: sleeperType,
            movements,
            detection_type,
            image : req.file && req.filename,
            } 
            
            await Sleeper.findByIdAndUpdate(id, editSleeper)

            res.status(200).json({message : {SUCCESS_EDIT}})

        } catch (e) {
            res.status(400).json({message: {FAILED_EDIT}})
        }
    }

// Controller pour supprimer un document dans la collection "Sleeper"
    export const deleteSleeper = async (req , res) => {
    try {
        const {id} = req.params

        await Sleeper.findByIdAndDelete(id)

        res.status(200).json({message : {SUCCESS_DELETE}})
    
    } catch (e) {
        res.status(400).json({message : {FAILED_DELETE}})
    }
}
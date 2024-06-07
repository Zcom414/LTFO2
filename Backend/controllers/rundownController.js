import Rundown from "../models/rundownModel.js";
import {FAILED_EDIT, FAILED_GET, FAILED_POST, FAILED_DELETE } from "../utils/errorHandling.js";
import { SUCCESS_POST , SUCCESS_EDIT, SUCCESS_DELETE, SUCCESS_GET } from "../utils/successHandling.js"

// Controller pour créer une "Rundown"
    export const addRundown = async (req, res) => {
        // Je dois faire un routeur pour les expeditions ???? Non
        try{
            const {name, status, expedition_name, sleeperId ,states ,type} = req.body 
            
            //Sécurité
            if(name.trim()
            || status.trim()
            || expeditions.trim()){

            return res.status(400).json({message:{FAILED_GET}})
            }
            
            const newRundown = new Rundown({
                name,
                type,
                status,
                states,
                expeditions: [{ expedition_name: expedition_name, sleepers: [sleeperId] }]

            })
            await Rundown.save()
            res.status(200).json({message: {SUCCESS_POST}})
        }

        catch (e){
           res.statu(400).json({message: {FAILED_POST}})
        }
    }

// Controller pour récupérer TOUTES les "Rundowns"
    export const getAllRundowns = async (req,res) => {

    try{
        const rundowns = await Rundown.find({})
        res.status(200).json(rundowns)
    }

    catch (e){ 
        res.status(400).json({message :{FAILED_GET}})
    }
}

// Controller pour récuperer une "Rundown"
    export const getOneRundowns = async (req, res) => {
        try{
            const {id} = req.params

            const rundown = await Rundown.findById(id)
            res.status(200).json({message : {SUCCESS_GET}})
        }
    
    catch (e){
        res.status(400).json({message: {FAILED_GET}})
    }
}

// Controller pour éditer une "Rundown"
    export const editRundowns = async (req, res) =>{
        try{
            const {id} = req.params
            const {name, status, expedition_name, sleeperId, states , type} = req.body
            
            const editRundowns = {
                name,
                type,
                status,
                expeditions: [{  states : [states], expedition_name: expedition_name, sleepers: [sleeperId] }]
        }

        await Rundown.findByIdAndUpdate(id, editRundowns)

        res.status(200).json({message: {SUCCESS_EDIT}})
    }

        catch(e){
            console.log(e)
            res.status(400).json({messa : {FAILED_EDIT}})
        }
    }
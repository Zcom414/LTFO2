
import Weapon from "../models/weaponModel.js";
import { FAILED_GET, FAILED_POST, FAILED_EDIT , FAILED_DELETE } from "../utils/errorHandling.js"
import { SUCCESS_POST , SUCCESS_EDIT, SUCCESS_DELETE } from "../utils/successHandling.js"
import { MACHINE_GUN, MELEE, ONE_HANDED, PRECISE, RIFLE, SHOTGUN } from "../utils/weaponType.js";
//Controller pour créer un weapon
export const addWeapons = async (req, res) => {

    try{

        const {name, weapon_type,firemode, max_ammo, dps , dpm , reload_time , description, precision_multiplier,stagger, image, holster} = req.body


        // Sécurité
        if(
             name.trim() === ""
            || weapon_type.trim() === "" 
            || firemode.trim() === ""
            || holster.trim() === ""
            || isNaN(max_ammo) && max_ammo< 0 || max_ammo<0
            || isNaN(dps) && dps<0
            || isNaN(dpm) && dpm<0
            || isNaN(precision_multiplier) && precision_multiplier<0
            || isNaN(stagger) && stagger<0
            || reload_time.trim() === ""
            || description.trim() === ""
            || image.trim() === ""
           ){
            console.log(req.body)
            return res.status(400).json({message :{FAILED_POST}})
           }

       

           let weaponType;
           //Précision du type en ajout
        if (ONE_HANDED.includes(weapon_type)){
            weaponType = {one_handed: weapon_type}
        } else if (RIFLE.includes(weapon_type)){
            weaponType = {rifle: weapon_type}
        } else if (SHOTGUN.includes(weapon_type)){
            weaponType = {shotgun: weapon_type}
        } else if (MACHINE_GUN.includes(weaponType)){
            weaponType = {machine_gun: weapon_type}
        } else if (PRECISE.includes(weapon_type)){
            weaponType = {precise: weapon_type}
        } else if (MELEE.includes(weaponType)){
            weaponType = {melee: weapon_type}
        }

        const newWeapon = new Weapon({
            name,
            weapon_type,
            holster,
            firemode,
            max_ammo: parseFloat(max_ammo),
            damages: {
                dps: parseFloat(dps),
                dpm: parseFloat(dpm),
                precision_multiplier: parseFloat(precision_multiplier),
                stagger: parseFloat(stagger)},
            reload_time: parseFloat(reload_time),
            description,
            image: req.file && req.filename
        })

        // Sauvegarder le nouveau Weapon
        await newWeapon.save()
        res.status(200).json({message: {SUCCESS_POST}})
    }

    catch (e){
         res.status(400).json({message :{FAILED_POST}})
    }
}


import  mongoose  from "mongoose";

const weaponSchema = new mongoose.Schema({

    name:{
        type: String,
    },

    weapon_type:{
           one_handed: {
            type: String,
            enum : ["Pistol", "Burst Pistol", "HEL Revolver", "Machine Pistol", "HEL Autopistol", "Revolver", 
            "High Cal Pistol"]
           },

           rifle : {
            type: String,
            enum : ["Bullpup" , "SMG" , "PDW", "Heavy SMG", "Carabine", "DMR", "Double Tap Rifle", "Assault Rifle", 
            "Burst Rifle", "Rifle", "Heavy Assult Rifle", "Short Rifle", "HEL Gun"]
           },

           shotgun : {
            type: String,
            enum : ["Sawed-off Shotgun", "HEL Shotgun", "Slug Shotgun", "Shotgun", "Combat Shotgun", "Scattergun", 
            "Choke Mod Shotgun"]
           },

           machine_gun : {
            type: String,
            enum : ["Machine Gun V", "Machine Gun XII", "Burst Cannon"]
           },

           precise : {
            type: String,
            enum : ["Precision Riffle", "Sniper", "HEL Rifle"]
           },

           melee : {
            type: String,
            enum : ["Sledgehammer", "Knife", "Bat", "Spear"]
           }
    },

    holster : {
        type: String,
        enum : ["Primary" , "Secondary"]
    },

    firemode: {
        type: String,
        enum : ["Semi-automatic" , "Automatic" , "Burst-fire" , "Shotgun" , "Slug Dhotgun", "Melee"]
    },

    max_ammo: {
        type: Number,
    },

    damages: {
        dps : Number,
        dpm : Number,
        precision_multiplier: Number,
        stagger : Number
        },
    
    reload_time: {
        type: Number,
    },

    description: {
        type: String,
    },

    image: {
        type: String,
        default: "default-weapon.jpg"
    }
}, {
    timestamp: true
});

//Hook
const Weapon = mongoose.model('Weapons', weaponSchema);

export default Weapon
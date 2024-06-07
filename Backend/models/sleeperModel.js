import mongoose from "mongoose";
import multer from "multer";

const sleeperSchema = new mongoose.Schema({
    types: {
         common: {
            type: String,
            enum : ["Striker" , "Shooter" , "Scout" , "Giant" , "Giant Shooter" , "Hybrid"]
         },
        unique: {
            type: String,
            enum: ["Charger" , "Giant Charger" , "Charger Scout" , "Shadow" , "Giant Shadow" , "Shadow Scout" , "Baby Striker" , "Flyer" , "GiantFlyer" , "Snatcher"]
        },
        boss: {
            type: String,
            enum : ["Mother" , "Big Mother" , "Tank" , "Immortal" , "Kraken"] 
        },
    },

    movements: {
        type: String,
        enum: ["Asleep" , "Wandering"]
    },

    detection_type: {
        type: String,
        enum: ["Awakening" , "Feelers" , "Damage the detected"]
    },

    image: {
        type: String,
        default: "default-sleepers.jpg"
    },

    altImg:{
        type: String,
    },

    description:{
        type: String,
        required: true,
        minLength:10,
        maxLenght: 4000,
    }
}, {
    timestamp : true
});

// Hook

const Sleeper = mongoose.model('Sleeper', sleeperSchema)

export default Sleeper
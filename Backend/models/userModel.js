import  mongoose  from "mongoose";
import bcrypt from "bcrypt"
import multer from "multer";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 4,
        maxLenght: 20
    },

    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
    },

    image: {
        type: String,
        required: true,
        default: "imgages-utilisateurs.jpg"
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLenght: 55 
    },

    role: {
        type: String,
        required: true,
        enum: ["admin" , "user" ],
        default: "user"
    }
}, {
    timestamps : true
})

// Hook qui sera exécuté avant la création de l'utilisateur
userSchema.pre("save", async function (next) {
    
    // SI le champ mot de passse n'a pas été modifié
    if(!this.isModified("password")){
        return next();
    }
    
    try {
        
        const salt = bcrypt.genSaltSync(10) // 2e10
        this.password = bcrypt.hashSync(this.password, salt)
        next();
        
    } catch (e) {
        next(e)
    }
    
})

const User = mongoose.model("User", userSchema)
export default User
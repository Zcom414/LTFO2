import mongoose from "mongoose";
import dotenv from "dotenv";

// ODM Mongoose 

dotenv.config();

// Permet de me connecter à une base de données existante
export const connectDB = mongoose.connect(`${process.env.MONGO_URI}`);

// Si la connexion fonctionne
mongoose.connection.on("open", () => {
    console.log("Database connexion etablished");
})

// Si la connexion échoue avec la BDD
mongoose.connection.on("error", () => {
    console.log("Error, impossible to connect with DB");
})
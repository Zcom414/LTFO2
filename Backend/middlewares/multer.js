import multer from "multer";
import path from "path";
import mongoose from "mongoose";


const maxSize = 5242880 // environ 5 MO

const storageEngine = multer.diskStorage({
    destination: "./front/public/uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`)
        // chat.png => 1586585855-chat.png || Image de Loic
        // chat.png => 1554127999-chat.png || Image de Gabriele
    }
})


const fileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
    size: Number,
    mimetype: String,
    uploadDate: { type: Date, default: Date.now }
  });

const File = mongoose.model('file', fileSchema)

// Route de téléchragment des fichiers


// Fonction qui retourne et qui va vérifier le type des fichiers autorisés
const checkFileType = (file, cb) => {
    
    // Autorisation des fichiers img
    const fileTypes = /png|jpg|jpeg|PNG|JPG|JPEG/
    
    
    // Vérification des extensions de fichiers
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    
    if(extName && mimeType){
        return cb(null, true)
    }else {
        cb("Format de fichier non supporté")
    }
}

const upload = multer({
    storage: storageEngine,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})



export default upload
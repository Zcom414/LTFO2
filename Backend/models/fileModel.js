import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
    size: Number,
    mimetype: String,
    uploadDate: { type: Date, default: Date.now }
});

export const File = mongoose.model('File', fileSchema)

export default fileSchema
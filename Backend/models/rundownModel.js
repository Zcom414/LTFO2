import mongoose from 'mongoose';
import multer from 'multer';

const expeditionSchema = new mongoose.Schema({
  expedition_name: String,
  states: [String],
  sleepers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sleeper'
  }]
});

const rundownSchema = new mongoose.Schema({
  name: String,
  
   type: {
    type: String,
    enum: ["main", "restricted"],
    // default: "main",
    required: true,
},
  status: {
    type: String,
    enum: ['default', 'unlock'],
    required: true
  },

  image:{
    type: String,
    default: "default-main.png"
  },
  expeditions: [expeditionSchema]
}, {
    timestamps : true
});

const Rundown = mongoose.model('Rundown', rundownSchema);

export default Rundown;
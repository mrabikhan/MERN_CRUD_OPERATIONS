import mongoose,{Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    }
}, {timeseries: true})

export default mongoose.model("User", userSchema)
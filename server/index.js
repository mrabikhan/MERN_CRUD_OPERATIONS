import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import cors from "cors"
import { DB_NAME } from "./utils/contants.js"
import bodyParser from "body-parser"
//body parser is a middleware for nodejs 

const app = express()
app.use(bodyParser.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

const PORT = process.env.PORT || 3000
const URL = `${process.env.MONGODB_URI}/${DB_NAME}`

/* const connectionInstance = mongoose.connect(URL).then(() => {
    console.log("MongoDB Connected Successfully ")
    
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`)
    })

}).catch((error) => {
    console.log(error)
})
   
*/

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(URL)
        console.log("MongoDB connected successfully!")  
        app.listen(PORT, () => {
               console.log(`Server is listening on the port ${PORT}`)
        })
    }catch(error){
   console.log(error)
}
}
connectDB()

//Import Routes:
import router from "./routes/userRoute.js"

//Declare Routes:
app.use("/api/v1/users", router)

export default app;
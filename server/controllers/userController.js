import User from "../models/userModel.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

 const registerUser = asyncHandler(async(req, res) => {
   const {fname, email, password} = req.body

   if(!fname && !email && !password){
    throw new ApiError(400, "All fields are required!")
   }

   const user = await User.create({
    fname,
    email: email.toLowerCase(),
    password
   })
    
   const createUser = await User.findById(user._id).select("-password") //De-select password for security reasons.
   if(!createUser){
    throw new ApiError(500,"Something went wrong while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200, user, "User Is Created Successfully!")
   )
 })

 const getUser = asyncHandler(async (req, res) => {
           const userData = await User.find()
           if(!userData){
            throw new ApiError(404,"User not found")
           }

           return res.status(200).json(new ApiResponse(201, userData, "Users Fetched Successfully!"))
 })

 //Get one user by ID:
  const getOne = asyncHandler(async(req, res) => {
   
  const id = req.params.id
  const user = await User.findById(id) 
  if(!user){
    throw new ApiError(404, "User Does No Exist")
  }
  return res.status(200).json(new ApiResponse(201, user, "User Fetched Successfully!"))
 
 //Get one user by email:
  //  const {email} = req.body 

  //  if(!email){
  //   throw new ApiError(400, "All fields are required")
  //  } 

  //  const user = await User.findOne(req.email)
  //  const getId = user._id
  //  const getUserData = await User.findById(getId)
  //  return res.status(200).json(new ApiResponse(201, getUserData, "User Fetched Successfully"))
 }) 

//Update API:
const updateUser = asyncHandler(async (req,res) => {
  const id = req.params.id
  const{fname, email, password} = req.body
  if(!fname && !email && !password){
    throw new ApiError(404, "You did not updated any field")
  }

  const userExist = await User.findById(id)
if(!userExist){
    throw new ApiError(401,"User does not exist!")
}

//const updateData = await User.findByIdAndUpdate(id, req.body, {new:true}) //Easy Way to Update

const updateData = await User.findByIdAndUpdate(
    id, {
    $set:{
      fname: fname,
      email: email,
      password: password
    } 
    },
    {new:true}
)
return res.status(200).json(new ApiResponse(201, updateData, "The user is updated successfully!"))

})

const deleteUser = asyncHandler(async(req,res) => {
    const id = req.params.id
    const userExist = await User.findById(id)

    if(!userExist){
        throw new ApiError(400, "User Does Not Exist!")
    }

    await User.findByIdAndDelete(id)
    return res.status(200).json(new ApiResponse(201, "User deleted Successfully!"))
}) 

export {
    registerUser,
    getUser,
    getOne,
    updateUser,
    deleteUser
}
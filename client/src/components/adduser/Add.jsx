import React, { useState } from 'react'
import './Add.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Add() {
  const users = {
    fname:"",
    email:"",
    password:""
  }
  
  //Hooks:
  const[user, setUser] = useState(users) 
  const navigate = useNavigate()

  const inputHandler = (e) => {
     const {name, value} = e.target  //name has attribute value 'fname', email or pass' and value has the value from input fields
     setUser({...user, [name]:value})
     console.log(user)
    }

  const submitForm = async(e) => {
     e.preventDefault();
     await axios.post("http://localhost:8000/api/v1/users/register", user)
     
     .then((res)=>{
    //  toast.success(res.data.msg, {position:'top-right'})
        toast.success('User Created Successfully', {position:'top-right'})

      navigate("/")
     
    }).catch(error => console.log(error))
  }  

  return (
    <div className='addUser'>
      <Link className='backbtn' to={"/"}> Back </Link>
      <h3> Add New User </h3>
       <form onSubmit={submitForm}>
         <div className='inputGroup'>
          <label htmlFor='fname'> First Name </label><br/>
          <input 
          type='text' 
          id='fname' 
          name='fname' 
          autoComplete='off' 
          placeholder='Enter First Name'
          onChange={inputHandler}
          />
         </div>

         <div className='inputGroup'>
          <label htmlFor='email'> Email Address </label><br/>
          <input 
          type='text' 
          id='email' 
          name='email' 
          autoComplete='off' 
          placeholder='Enter Email Address'
          onChange={inputHandler}
          />
         </div>

         <div className='inputGroup'>
          <label htmlFor='password'> Password </label><br/>
          <input 
          type='password' 
          id='password' 
          name='password' 
          autoComplete='off' 
          placeholder='Enter Password'
          onChange={inputHandler}
          />
         </div>
         <div className='inputGroup'>
            <button className='addbtn'> Register </button>
         </div>
       </form>  
      
    </div>
  )
}

export default Add
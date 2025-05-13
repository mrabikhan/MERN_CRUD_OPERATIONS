import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Update.css'
import axios from 'axios';
import toast from 'react-hot-toast'

function Update() {
  const users = {
    fname:"",
    email:"",
    password:""
  }

  const{id} = useParams();
  
  const[user, setUser] = useState(users)
   
  const navigate = useNavigate()

  const updateHandler = (e) => {
    const{name, value} = e.target
    setUser({...user,[name]:value})
    console.log("handler: ",user)
  }

  useEffect(()=>{
     axios.get(`http://localhost:8000/api/v1/users/getoneuser/${id}`)
     .then((response) => {
       setUser(response.data.data)
       console.log(user)

    }).catch((error) => {
      console.log(error)
     })
  },[id])
  
  const submitForm = async(e) => {
     e.preventDefault();
     await axios.put(`http://localhost:8000/api/v1/users/updateuser/${id}`, user)
     
     .then((res)=>{
        toast.success(res.data.message, {position:'top-right'})

      navigate("/")
     
    }).catch(error => console.log(error))
  }


  return (
      <div className='updateUser'>
      <Link className='backbtn' to={"/"}> Back </Link>
      <h3> Update Existing User </h3>
       <form onSubmit={submitForm}>
         <div className='inputGroup'>
          <label htmlFor='fname'> Update Name </label><br/>
          <input 
          type='text' 
          id='fname' 
          name='fname' 
          autoComplete='off' 
          value={user.fname}
          onChange={updateHandler}
          />
         </div>

         <div className='inputGroup'>
          <label htmlFor='email'> Update Email </label><br/>
          <input 
          type='text' 
          id='email' 
          name='email' 
          autoComplete='off' 
          value={user.email}
          onChange={updateHandler}
          />
         </div>

         <div className='inputGroup'>
          <label htmlFor='password'>Update Password </label><br/>
          <input 
          type='password' 
          id='password' 
          name='password' 
          autoComplete='off' 
          value={user.password}
          onChange={updateHandler}
          />
         </div>
         <div className='inputGroup'>
            <button className='updatebtn'> Update User </button>
         </div>
       </form>    
    </div>
  )
}

export default Update
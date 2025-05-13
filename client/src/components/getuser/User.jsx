import React, { useEffect, useState } from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function User() {
   const[users, setUsers] = useState([])

   
   const delUser = async(userId) => {
      await axios.delete(`http://localhost:8000/api/v1/users/deleteuser/${userId}`)
        .then((response) => {
         setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
         toast.success(response.data.message, {position:'top-right'})  
      }
            
        ).catch((error)=>{
         console.log(error)
        })
   }

   useEffect(() => {
    const fetchUser = async()=>{  
     const responseData = await axios.get("http://localhost:8000/api/v1/users/getusers")
     setUsers(responseData.data.data)
   } 
   fetchUser()
    },[])

  return (
    <div className='userTable'>
        <Link to={'/add'} className='adduserbtn'> Add User</Link>
        <button className='printbtn' onClick={()=>{window.print()}}> 
        <i className='fa-solid fa-print'></i> Print </button>
        <table  cellPadding={10}>
            <thead>
               <tr>
                  <th>SNo</th>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>Actions</th>
               </tr>
            </thead>

            <tbody>
                {
                  Array.isArray(users) && users.map((user, index)=>{
                     return(
               <tr key={index}>
                  <td> {index + 1} </td>
                  <td> {user.fname} </td>
                  <td> {user.email} </td>
                  <td>
                    <button className='userdelbtn' onClick={() => delUser(user._id)}> <i className="fa-solid fa-trash"></i> </button>
                    <Link to={`/edit/` + user._id} className='usereditbtn'> <i className="fa-solid fa-pen-to-square"></i> </Link>
                  </td>
               </tr>
                     )
                  })

                }
            </tbody>
        </table>
    </div>
  )
}

export default User
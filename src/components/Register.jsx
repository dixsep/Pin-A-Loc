import React, {useState, useRef} from 'react'
import {Room,Cancel} from '@material-ui/icons'
import './register.css';
import axios from 'axios'
const Register = ({setShowRegister}) => {
   
     const [success,setSuccess] = useState(false);
     const [error,setError] = useState(false);
     const nameRef = useRef()
     const emailRef = useRef()
     const passwordRef = useRef()
     const handleSubmit = async (e)=>{
          e.preventDefault();
          const newUser ={
               username:nameRef.current.value,
               email:emailRef.current.value,
               password:passwordRef.current.value,
          };
        try{
            await axios.post("/users/register", newUser);
            setError(false)
           setSuccess(true);
        }catch(err){
          setError(true);
        }
     }
  return (
    
     <div className="registerContainer">
     <div className="logo">
          <Room />
          PINALOC
     </div>
     <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" ref={nameRef}/>
          <input type="email" placeholder="EMail-Id" ref={emailRef}/>
          <input type="password" placeholder="Password" ref={passwordRef}/>
          <button className="registerBtn">REGISTER</button>
          {success && (<span className="success">Registered Succesfully . You can login now.</span>) }
          {error && (<span className="failure">Something Went Wrong</span>)}
          
     </form>
     <Cancel className="cancel" onClick={()=> setShowRegister(false)} />
    </div>
  )
}

export default Register

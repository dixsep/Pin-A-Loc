import React, {useState, useRef} from 'react'
import {Room,Cancel} from '@material-ui/icons'
import './login.css';
import axios from 'axios'
const Login = ({setShowLogin, myStorage, setCurrentUser}) => {
   
    
     const [error,setError] = useState(false);
     const nameRef = useRef()
    
     const passwordRef = useRef()
     const handleSubmit = async (e)=>{
          e.preventDefault();
          const user ={
               username:nameRef.current.value,
              
               password:passwordRef.current.value,
          };
        try{
            const res = await axios.post("/users/login",user);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false)
           
        }catch(err){
          setError(true);
        }
     }
  return (
    
           <div className="loginContainer">
     <div className="logo">
          <Room />
          PINALOC
     </div>
     <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" ref={nameRef}/>
          
          <input type="password" placeholder="Password" ref={passwordRef}/>
          <button className="loginBtn">LOGIN</button>
          {! error && (<span className="success">You are logged in successfully</span>)}
          {error && (<span className="failure">Something Went Wrong</span>)}
          
     </form>
     <Cancel className="cancel" onClick={()=> setShowLogin(false)} />
    </div>
  )
}

export default Login;

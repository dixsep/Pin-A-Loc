import React, {useEffect, useState} from 'react'
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons'
import axios from 'axios';
import {format} from 'timeago.js'
import './app.css'
import Register from './components/Register';
import Login from './components/Login';
function App() {
    const myStorage = window.localStorage;
     const [currentUser, setCurrentUser] =useState(null);
     const [pins,setPins] = useState([])
     const [currentPlaceId,setCurrentPlaceId] = useState(null)
     const [newPlace,setNewPlace] = useState(null);
     const [title,setTitle] = useState(null);
     const [desc,setDesc] = useState(null);
     const [rating,setRating] = useState(0);
     const [showRegister , setShowRegister] = useState(false);
     const [showLogin, setShowLogin] = useState(false);
     const [viewport , setViewport] = useState({
          width:"100vw",
          height:"100vh",
          latitude:17.3850,
          longitude:78.4867,
          zoom:4
     });
    
   useEffect(()=>{
       const getPins = async ()=>{
          try{
                const res = await axios.get("/pins");
                setPins(res.data)
          }catch(err){
             console.log(err)
          }
       }
       getPins()
   }, [])

   const handleMarkerClick =  (id,lat,long) =>{
     setCurrentPlaceId(id)
     setViewport({...viewport, latitude:lat,longitude:long})
   }

 const handleAddClick = (e)=>{
    const [long,lat] = e.lngLat;
    setNewPlace({
     lat:lat,
     long:long,
    })
 }

 const handleSubmit = async (e)=>{
     e.preventDefault();
    const newPin ={
     username:currentUser,
     title:title,
     desc:desc,
     rating:rating,
     lat:newPlace.lat,
     long:newPlace.long,
    }
    try{
      const res = await axios.post("/pins", newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(err){
     console.log(err);
    }
 }

 const handleLogout = ()=>{
  myStorage.removeItem("user")
  setCurrentUser(null);
 }

  return (
    <div>
     <ReactMapGL
       {...viewport}
       mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
       onViewportChange={nextViewPort => setViewport(nextViewPort)}
       mapStyle="mapbox://styles/dixoct/cky1hcjx0037y15nu82p0dv5j"
       onDblClick={handleAddClick}
      
      >
          {pins.map(p=>(
               <>
               <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom*3.5} offsetTop={-viewport.zoom*7}>
               <Room style={{fontSize:viewport.zoom*7, color:p.username===currentUser?"crimson":"orange", cursor:"pointer"}} onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}/>
             </Marker>
             {p._id===currentPlaceId && <Popup
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={()=>setCurrentPlaceId(null)}
             >
                  <div className="card">
                       <label>Place</label>
                       <h4 className="place">{p.title}</h4>
                       <label>Review</label>
                       <p className="desc">{p.desc}</p>
                       <label>Rating</label>
                       <div className="stars">
                        {
                          Array(p.rating).fill(<Star className="star" />)
                        }
                       </div>
                       <label>Information</label>
                       <span className="username">Created by <b>{p.username}</b> </span>
                       <span className="date">{format(p.createdAt)}</span>
                  </div>
             </Popup>
             }
            
             </>
          ))}  
          {newPlace && <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose ={()=>setNewPlace(null)}
           >
            {/*  we have to create a form  here*/}
            <div>
               <form onSubmit={handleSubmit}>
                    <label>PLACE</label>
                    <input placeholder="Enter ur Title" onChange={(e)=> setTitle(e.target.value)} />
                    <label>REVIEW</label>
                    <textarea placeholder="Enter your experience here" onChange={(e)=> setDesc(e.target.value)}/>
                    <label>RATING</label>
                    <select onChange={(e)=>setRating(e.target.value)}>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                    </select>
                    <button className="submitButton" type="submit">ADD PIN</button>
               </form>
            </div>
           </Popup> }
           {currentUser?(<button className="button logout" onClick={handleLogout}>Log Out</button>):( <div className="buttons">
          <button className="button login" onClick={()=>setShowLogin(true)}>Log In</button>
          <button className="button register" onClick={()=> setShowRegister(true)}>Register</button>
          </div>)}
         {showRegister && <Register setShowRegister={setShowRegister}/>}
         {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
          
     </ReactMapGL>
   </div>
  )
}

export default App
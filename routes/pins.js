import express from 'express'
import Pin from '../models/Pin.js'

const router = express.Router()

//CREATE 
router.post("/", async (req,res)=>{
     const newPin= new Pin(req.body);
     try{
          const savedPin = await newPin.save();
          res.status(200).json(savedPin)

     }catch(err){
          res.status(500).json(err)
     }
})
//GET PIN
router.get("/:id", async(req,res)=>{
     try{
          const pin = await Pin.findById(req.params.id);
          res.status(200).json(pin)
     }catch(err){
          res.status(500).json(err)
     }
})
//GET ALL PINS
router.get("/", async(req,res)=>{
     try{
          const pins = await Pin.find();
          res.status(200).json(pins)
     }catch(err){
          res.status(500).json(err)
     }
})

export default router;
const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

router.post("/orderdata", async(req,res)=>{
    let data= req.body.order_data
    //console.log(req.body.email)
     await data.splice(0, 0, {Order_date: req.body.order_date})

    let eId= await Order.findOne({'email': req.body.email})
    console.log(eId)

    if(eId == null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data] 
            }).then(()=>{
                res.json({success: true})
            })
        }catch(err){
            res.send('Server error', err.message)
        }
    }
    else{
        try{
            console.log(req.body.email)
         //   res.json({success: true})
            await Order.findOneAndUpdate({email: req.body.email},
                {  $push: {order_data: data}}).then(()=>{
                    res.json({success: true})
                })            
        }
        catch(error){
            res.send(error.message)
        }
    }
})

module.exports=router
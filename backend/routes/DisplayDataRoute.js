const express = require('express')
const router = express.Router()

router.post('/fooddata', (req,res) =>{
    try{
       // console.log(global.fooditems)
        res.send([global.fooditems, global.foodcategory])
    }
    catch(err){
        console.err(err.message)
        res.send('Server error')
    }
})

module.exports = router
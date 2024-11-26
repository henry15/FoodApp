const express = require('express')
const router = express.Router()

const user = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const { body, validationResult } = require('express-validator')
const { UNSAFE_ErrorResponseImpl } = require('react-router-dom')

const jwtsecret = process.env.ACCESSTOKEN

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)
        const secpassword = await bcrypt.hash(req.body.password, salt)

        try {
            //  console.log(req.body)
            await user.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location

                // name: "User1",
                // password: "1234",
                // email: "123@gmail.com",
                // location: "India"
            });
            res.status(200).json({ success: true })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    });


router.post("/login", 
    async (req, res) => {
        let email = req.body.email
        try {
           
             let userdataexist = await user.findOne({email})
             console.log(userdataexist)
            if (!userdataexist) {
                return res.status(400).json({ errors: "Invalid credentials" })
            }

            const pwdcompare=await bcrypt.compare(req.body.password, userdataexist.password)
            //if (req.body.password !== userdataexist.password) {
            if (!pwdcompare) {
                return res.status(400).json({ errors: "Invalid password" })
            }

            const data={
                user:{
                    id: userdataexist.id                    
                }
            }
            const authtoken=jwt.sign(data, jwtsecret)

            return res.json({success: true, authtoken: authtoken})
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    })

module.exports = router
const express= require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT
const mongodb = require('./db')

// for CORS policy error
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://foodapp-n5ns.onrender.com")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept"
    );
    next();
})

mongodb()
app.use(express.json())

app.get("/", (req, res)=>{

    res.send('Hello')   
});

app.use('/api',require("./routes/UserRouter"))
app.use('/api',require("./routes/DisplayDataRoute"))
app.use('/api', require('./routes/OrderRoute'))

console.log(port)
app.listen(port,()=>{
    console.log(`port running on ${port}`)
})
 
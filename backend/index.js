const express= require("express");
const app = express();
const port = 5000

const mongodb = require('./db')

// for CORS policy error
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
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

app.listen(port,()=>{
    console.log(`port running on ${port}`)
})
 
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

//connect database

connectDB();

// Init Middleware

app.use(express.json({extended:false}));
app.use('/static', express.static(__dirname + "/public"))
app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use('/api/users',require('./routes/api/users'))


const PORT  = process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`));
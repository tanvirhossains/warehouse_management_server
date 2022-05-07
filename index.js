const express = require("express");

const port = process.env.PORT || 4000;
const app = express()



app.get('/', (req , res) => {
    res.send('mobile market in started') 
})

app.listen(port , () =>{
    console.log('Hearing the port', port)
})
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const port = 8000;
app.use(cors())

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    
})

app.listen(port, ()=>{
    console.log('listening')
})
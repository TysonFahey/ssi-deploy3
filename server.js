const express = require('express')
const apiRoutes = require('./routes/api') //import api.js

const app = express() // make new express app

app.use(express.json())

app.use('/api', apiRoutes)

app.use(function(req, res, next){
    res.status(404).send('Sorry, not found')
    // can't find a matching route
})

app.use(function(err, req, res, next){
    console.log(err.stack)
    res.status(500).send('Server error') // 500 is server error 
})

const server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port ', server.address().port)
}) // get server running 
let express = require('express')

let api_routes = require('./routes/api.js')

let path = require('path')
let app = express()
let vueClientPath = path.join(__dirname,'student-sign-in-client','dist')

app.use(express.static(vueClientPath))

//handling json
app.use(express.json())
app.use('/api', api_routes)

app.use(function(req,res,next){
    //general route only run if the route above does not run
    //response to anything that is not one of the routes we have configured
    res.status(404).send('Not Found')
})

app.use(function(req,res,next){
    console.error(err.stack)
    res.status(500).send('Server Error')
})



let server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port', server.address().port)
})

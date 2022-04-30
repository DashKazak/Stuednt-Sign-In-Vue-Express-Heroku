let express = require('express')
let Sequelize = require('sequelize')
const { sequelize } = require('../models')
let db = require('../models')
let Student = db.Student

let router = express.Router()

//GET request
router.get('/students', function(req,res,next){
    //order helps sort students by the name order, in the array we can sort by multiple thigns
    Student.findAll({order:['name','present']}).then(students => {
        return res.json(students)
    }).catch(err => next(err))
})

//POST request
router.post('/students',function(req,res,next){
    Student.create( req.body ).then(data =>{
        //status code traditionally sent back when smth was created -- 201
        return res.status(201).send('success')
    }).catch(err => {
        //catch errors from seqelize adn see info about the error
        //handle user errors, ie missing starid
        if (err instanceof db.Sequelize.Validationerror){
            //respond with 400 
            let messages = err.errors.map(e=>e.message)
            return res.status(400).json(messages)
        }

        //server errors: 500: how to deal with those
        //see ServiceWorkerRegistration.js line 17
        
        return next(err) //control goes back to server js and line 17 gets executed
    })
})

//edit a student
router.patch('/students/:id',function(req,res,next){
    //:id will match requests with appropriate students/1,2,3,etc. 
    //request is to students/100
    //StudentID will be 100
    let studentID = req.params.id

    let updatedStudent = req.body
    Student.update(updatedStudent,{ where :{ id: studentID}})
    .then((rowsModified)=>{
        let numberOfRowsModifies = rowsModified[0]
        if (numberOfRowsModifies == 1){
            return res.send('success')
        }else{ //student not found
            return res.status(404).json(['Student with that id not found'])
        }
        
        //makign modifications that violate constraints: same starid as another, no name

        
    }).catch(err => {
        //if val error, tell the suer its a bad req
        if (err instanceof db.Sequelize.ValidationError){
            let messages = err.errors.map( e => e.messages)
            return res.status(400).json(messages)
        }else{
            return next(err)
            }
        })
})

//delete a student
router.delete('/students/:id', function(req,res,next){
    let studentID = req.params.id
    Student.destoy({where:{id:studentID}})
    .then((rowsDeleted)=>{
        if(rowsDeleted == 1){
        return res.send('success')
        } else{
            return res.status(404).json(['Not Found'])
        }
    })
    .catch( err => next(err)) //catches unexpected errors
})

module.exports = router
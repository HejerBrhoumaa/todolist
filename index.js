/**
 * route1: Post user/addTodo
 * route2: Put user/updateTodo
 * route3: DElete user/deleteTodo
 * route4: 

espress
body-parser
cors 
 */
const express =require('express');
const cors= require('cors');
const bodyParser=require('body-parser');
const todoController= require('./controller/Todocontroller');
const userController= require('./controller/Usercontroller')
const port=process. env.PORT ||2500;

var app=express();
app.use(bodyParser.json());
app.use(cors());
app.use('/TodoController',todoController);
app.use('/Usercontroller',userController);
app.use(express.static(__dirname));

app.get('/',(req, res)=>{
    res.send('hello from the server');

});

app.listen(port,()=>{
    console.log(`started on port ${port}`);
    
})
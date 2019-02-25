const express= require('express');
const toDoRouter= express.Router();
var {mongoose}=require('./../db/config')
var {Todo}=require('./../models/todo');

toDoRouter.post('/addTodo',(req,res)=>{
    var todoDetails= req.body;

    var todo =new Todo({
        title:todoDetails.title,
        body:todoDetails.body

    });
    todo.save().then((savedTodo)=>{
        if (!savedTodo){
            //statu= num erreur 400 operation, 200 parfait
            res.status(400).send({
                rereur:'save error Todo'
            })
        }
        res.status(200).send(savedTodo);
    }).catch((e)=>{
    res.status(400).send(e);
    })
});
toDoRouter.get('/',(req,res)=>{
    res.send('from todocontroller');
});
module.exports= toDoRouter;


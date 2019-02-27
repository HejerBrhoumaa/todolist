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
                return:'save error Todo'
            })
        }
        res.status(200).send(savedTodo);
    }).catch((e)=>{
    res.status(400).send(e);
    })
});
//*

/**
 * *******************update******************* */
toDoRouter.put('/updateTodo',(req,res)=>{    
    //findand update
    Todo.findOneAndUpdate(
            {'title':req.body.title},
            {$set:{'body':req.body.body,
                    'completedAt':new Date()
                }
        }).then((updatedtodo)=>{
            console.log(updatedtodo);
            if (!updatedtodo){
                return res.status(400).send('update failed')
            }
            res.status(200).send('update success')
        }   
    );
});
/***************remove********* */

toDoRouter.delete('/deleteTodo',(req,res)=>{
    Todo.findOneAndRemove({'title':req.body.title}).then((deletedTodo)=>{
        if (!deletedTodo){
            res.status(400).send('delete failed');
        }
        res.status(200).send('delete success');
    });  
});

/**************findOne******************* */
toDoRouter.post('/findOneTodo',(req,res)=>{
    Todo.findOne({'title':req.body.title}).then((findTodo)=>{
        if (!findTodo){
            res.status(400).send('not found');
        }
        res.status(200).send(`Todo finded:${findTodo}`);
    });
});

/***************find all******************* */
toDoRouter.get('/findAllTodos',(req,res)=>{
    Todo.find().then((todos)=>{
        if(!todos){
            res.status(400).send('find all failed');
        }
        res.status(200).send(`todos : ${todos}`);
    });
});


toDoRouter.get('/',(req,res)=>{
    res.send('from todocontroller');
});
module.exports= toDoRouter;


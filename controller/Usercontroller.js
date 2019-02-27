const express= require('express');
const usercontroller= express.Router();
var {mongoose}=require('./../db/config')
var {User}=require('./../models/user');



usercontroller.post('/addUser',(req,res)=>{
    var userDetails= req.body;
 
    var user =new User({
        firstname:userDetails.firstname,
        lastname:userDetails.lastname,
        birthday:userDetails.birthday,
        email:userDetails.email,
        password:userDetails.password
    });
    user.save().then((savedUser)=>{
        if (!savedUser){
            //statu= num erreur 400 operation, 200 parfait
            res.status(400).send({
                return:'save error User'
            })
        }
        res.status(200).send(savedUser);
    }).catch((e)=>{
    res.status(400).send(e);
    })
});
/******updateuser*********** */
usercontroller.put('/updateUser',(req,res)=>{
   
    User.findOneAndRemove({'email':req.body.email}).then((userToUpdate)=>{
        if (userToUpdate){
            var newUse =new User({});

            if(req.body.firstname) 
                newUse.firstname = req.body.firstname 
            else 
                newUse.firstname=userToUpdate.firstname ;

            if(req.body.lastname)  
                newUse.lastname = req.body.lastname 
            else 
                newUse.lastname=userToUpdate.lastname;

            if(req.body.birthday)  
                newUse.birthday = req.body.birthday 
            else 
                newUse.birthday=userToUpdate.birthday;

            if(req.body.password)  
                newUse.password = req.body.password 
            else 
                newUse.password=userToUpdate.password;
            newUse.email=userToUpdate.email;

        }else{
            res.status(400).send('user dosn\'t existed');
        }
        console.log(newUse);

        newUse.save().then((savedNewUser)=>{
                if(!savedNewUser){
                    res.status(400).send('failed save')
                }
                res.status(200).send(`success save',${savedNewUser}`)
            }
        ).catch(
            (e)=>{
                res.status(400).send(e);
            }
        );
    });
    
})

/**************************************RemoveUser******************************************** */
usercontroller.delete('/removeUser',(req,res)=>{
    User.findOneAndRemove({'firstname':req.body.firstname}).then(
        (removedUser)=>{
            if(!removedUser){
                res.status(400).send('user dosn\'t exist');
            }
            res.status(200).send(`success remove user${removedUser}`);
        }
    );
})

/**************************************findUser********************************************** */
usercontroller.post('/findUser',(req,res)=>{
    User.findOne({'firstname':req.body.firstname}).then((userFind)=>{
        if(!userFind){
            res.status(400).send('failed');
        }
        res.status(200).send(`user finded ${userFind}`)
    });
})
/**************************************findAllUser******************************************* */
usercontroller.get('/findAllUser',(req,res)=>{
    User.find().then((user)=>{
        if(!user){
            res.status(400).send('find all failed');
        }
        res.status(200).send(`users : ${user}`);
    });
});

usercontroller.get('/',(req,res)=>{
    res.send('from usercontroller');
});
module.exports= usercontroller;

const mongoose =require('mongoose');
/************************define module************************** */
var User = mongoose.model('User', {
        firstname: {
            type:String,
            required :true,
            minlength :3,
            trim :true
        } , 
        lastname: {
            type:String,
            required :true,
            minlength :3,
            trim :true,
        },
        birthday :String,
        email: {
            type:String,
            required :true,
            minlength :8,
            trim :true, 
        },
        password: {
            type:String,
            required :true,
            minlength :8,
            trim :true,
        }
    }
);


module.exports={User};
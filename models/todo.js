const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    title:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    body:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type : Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});




module.exports={Todo};
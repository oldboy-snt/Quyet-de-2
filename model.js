const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    content : {
        type : String, // String, Numberm Boolean, [type], {} ...
        required : true,
    },
    like : {
        type : Number,
        default : 0,
    },
    dislike : {
        type : Number,
        default : 0,
    }
}, {
    timestamps : true,
});

const questionsModel = mongoose.model('Question',questionSchema);

module.exports = questionsModel;
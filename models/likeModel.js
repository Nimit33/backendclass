//import mongoose
const mongoose = require("mongoose");


//route handler

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        //kis post pe like kr rhe ho
        ref: "Post", //reference to the post model
    },
    user: {
        //aur kon like kr rha hai user ka naam bagera kya hai
        type: String,
        required: true,
    },
});

//export
module.exports = mongoose.model("Like", likeSchema);
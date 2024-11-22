//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic 

exports.createComment = async (req, res) => {
    try {
        //fetch data from req body 
        const { post, user, body } = req.body;
        //request ki body mein se yeh saari info nikali
        //create a comment object
        const comment = new Comment({
            //yeh saari info ko model schema mein daal ke ache se structure kr diya
            post, user, body
        });

        //save the new comment into the database
        const savedComment = await comment.save();
        ///database mein save kr diya object ko


        //ab comments ko post model , controller mein bhi update krna pdega , ek id add krni
        //padegi comment array ke andar
        //find the post by ID, add the new commnet to its comments array
        const udpatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
            .populate("comments") //populate the comments array with comment documents
            .exec();

        res.json({
            post: udpatedPost,
        });

    }
    catch (error) {
        return res.status(500).json({
            error: "Error While Creating comment",
        });
    }
};
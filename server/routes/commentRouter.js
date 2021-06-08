const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");

router.post("/detail", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if(err) return res.json({success: false, err});

        Comment.find({_id: comment._id})
            .exec((err, result) => {
                if(err) return res.json({success: false, err});
                res.status(200).json({success: true, result});
            });
    });
});

router.post("/detail", (req, res) => {
    Comment.find({postId: req.body.boardId})
    .exec((err, comments) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, comments});
    });
});

module.exports = router;
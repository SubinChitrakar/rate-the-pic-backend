import {Router} from 'express';
import * as commentService from "../service/comment-service";

let router = Router();

router.post('/addComment', function (req, res, next) {
    commentService.getTodaysComment(req.body.userId)
        .then(response => {
            if (response.length > 0) {
                res.json({message: 'Already commented today'});
            } else {
                commentService.addComment(req.body)
            }
        })
        .then(response => {
            res.json({message: 'Comment Added'});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/:id', function (req, res, next) {
    let userId = req.params.id;
    commentService.getLatestComment(userId)
        .then(comments => {
            return commentService.getCommentsWithImages(comments)
        })
        .then(commentsWithImage =>{
            res.json({data: commentsWithImage});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/getComment/:id', function (req, res, next) {
    let imageId = req.params.id;
    let commentList =[];
    commentService.getAllComments(imageId)
        .then(comments=>{
            return commentService.getUserForComments(comments)
        })
        .then(commentsWithUser => {
            commentList = commentsWithUser;
            return commentService.getAverageRating(imageId)
        })
        .then(averageRating =>{
            res.json({data: commentList, average: averageRating[0].avg});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        })
});


export default router;

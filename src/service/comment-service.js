import * as commentModel from "../model/comment-model";
import * as userModel from "../model/user-modal";
import * as imageModel from "../model/image-model";

export function addComment(comment) {
    return commentModel.addComment(comment);
}

export function getTodaysComment(userId) {
    return commentModel.getTodaysComment(userId);
}

export function getLatestComment(userId){
    return commentModel.getLatestComment(userId);
}

export function getCommentsWithImages(comments) {
    let promises =[];
    for(let i=0;i<comments.length;i++){
        promises.push(getCommentWithImage(comments[i]))
    }
    return Promise.all(promises);
}

export function getCommentWithImage(comment){
    let commentWithImage;
    return new Promise((resolve, reject) => {
        commentWithImage = Object.assign({}, comment);
        return imageModel.getImageById(comment.image_id)
            .then(imageDetails =>{
                commentWithImage.imageDetails = imageDetails;
                resolve(commentWithImage)
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

export function getAllComments(imageId) {
    return commentModel.getAllComments(imageId)
}

export function getUserForComments(comments) {
    let promises =[];
    for(let i=0;i<comments.length;i++){
        promises.push(getUserForComment(comments[i]))
    }
    return Promise.all(promises);
}

export function getUserForComment(comment){
    let commentWithUser;
    return new Promise((resolve, reject) => {
        commentWithUser = Object.assign({}, comment);
        return userModel.getUserEmail(comment.user_id)
            .then(userEmail =>{
                commentWithUser.email = userEmail[0].email;
                resolve(commentWithUser);
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

export function getAverageRating(imageId){
    return commentModel.getAverageComment(imageId)
}

export function deleteComment(imageId){
    return commentModel.deleteComment(imageId);
}

import config from '../knexfile.js';
import knex from 'knex';
import moment from 'moment';

let knexConnection = knex(config.development);

export function getTodaysComment(userId) {
    let yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
    let tomorrowsDate = moment().add(1, 'day').format('YYYY-MM-DD');

    return new Promise(((resolve, reject) => {
        knexConnection('comments')
            .select('*')
            .where({user_id: userId})
            .whereRaw('comment_date > ?', [yesterdayDate])
            .whereRaw('comment_date < ?', [tomorrowsDate])
            .then(comment => {
                resolve(comment);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function addComment(commentInfo) {
    return new Promise(((resolve, reject) => {
        knexConnection('comments').insert({
            image_id: commentInfo.imageId,
            user_id: commentInfo.userId,
            comment: commentInfo.commentDetails,
            rating: commentInfo.rating
        }).returning('*')
            .then(addedUser => {
                resolve(addedUser);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function getLatestComment(userId){
    return new Promise(((resolve, reject) => {
        knexConnection('comments')
            .select('*')
            .where({user_id: userId})
            .orderBy('comment_date', 'desc')
            .limit(5)
            .then(comments => {
                resolve(comments);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function getAllComments(imageId){
    return new Promise(((resolve, reject) => {
        knexConnection('comments')
            .select('*')
            .where({image_id: imageId})
            .orderBy('comment_date', 'desc')
            .then(comments => {
                resolve(comments);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function getAverageComment(imageId){
    return new Promise(((resolve, reject) => {
        knexConnection('comments')
            .avg('rating')
            .where({image_id: imageId})
            .then(averageRating => {
                resolve(averageRating);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function deleteComment(imageId){
    return new Promise((resolve, reject) => {
        knexConnection('comments').where({image_id:imageId}).del()
            .then(commentId => {
                resolve(commentId);
            })
            .catch(err=> {
                reject(err);
            })
    })
}



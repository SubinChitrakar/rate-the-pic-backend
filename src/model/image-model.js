import config from '../knexfile.js';
import knex from 'knex';

let knexConnection = knex(config.development);

export function saveImage(image_name, image_path) {
    return new Promise(((resolve, reject) => {
        knexConnection('images').insert({
            image_name: image_name,
            image_path: image_path
        }).returning('*')
            .then(savedImage => {
                resolve(savedImage);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function getImageById(imageId){
    return new Promise(((resolve, reject) => {
        knexConnection('images').select('*').where({id: imageId})
            .then(imageDetails => {
                resolve(imageDetails);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function getAllImage() {
    return new Promise(((resolve, reject) => {
        knexConnection('images').select('*').orderBy('upload_date', 'desc')
            .then(allImages => {
                resolve(allImages);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

export function deleteImage(imageId){
    return new Promise((resolve, reject) => {
        knexConnection('images').where({id:imageId}).del()
            .then(imageId => {
                resolve(imageId);
            })
            .catch(err=> {
                reject(err);
            })
    })
}

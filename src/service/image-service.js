import * as imageModel from '../model/image-model';
import * as commentModel from '../model/comment-model';

export function getAllImages(){
    return imageModel.getAllImage();
}

export function getRandomImage(userId){
    return new Promise(((resolve, reject) => {
        return getAllImages()
            .then(images =>{
                let randomImage = Math.round(Math.random() * images.length-1);
                resolve(images[randomImage]);
            })
            .catch(err =>{
                reject(err);
            })
    }));
}

export function saveImage(image){
    return imageModel.saveImage(image.filename, image.path)
}

export function deleteImage(imageId){
    return imageModel.deleteImage(imageId);
}

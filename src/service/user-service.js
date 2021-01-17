import * as userModel from '../model/user-modal';

export function verifyUser(user) {
    return userModel.verifyUser(user);
}

export function findUser(userEmail) {
    return userModel.findUser(userEmail);
}

export function registerUser(user){
    return userModel.registerUser(user);
}

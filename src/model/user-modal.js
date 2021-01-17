import config from '../knexfile.js';
import knex from 'knex';

let knexConnection = knex(config.development);

export function findUser(userEmail) {
    return new Promise(((resolve, reject) => {
        knexConnection('users').where({email: userEmail}).first('*')
            .then(searchedUser => {
                resolve(searchedUser);
            })
            .catch(err => {
                reject(err);
            });
    }))
}

export function getUserEmail(userId){
    return new Promise(((resolve, reject) => {
        knexConnection('users').where({id: userId}).select('email')
            .then(emailAddress => {
                resolve(emailAddress);
            })
            .catch(err => {
                reject(err);
            });
    }))
}

export function verifyUser(existingUser) {
    return new Promise((resolve, reject) => {
        knexConnection('users').where({email:existingUser.email, password: existingUser.password}).first('*')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function registerUser(user) {
    return new Promise(((resolve, reject) => {
        knexConnection('users').insert({
            email: user.email,
            password: user.password,
            admin: false
        }).returning('*')
            .then(addedUser => {
                resolve(addedUser);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

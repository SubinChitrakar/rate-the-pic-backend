import config from '../knexfile.js';
import knex from 'knex';

let knexConnection = knex(config.development);

export function displayUser(){
    return new Promise(((resolve, reject) => {
        knexConnection('users').select('*')
            .then(userList =>{
                resolve(userList);
            })
            .catch(err=>{
                console.log(err);
                reject(err);
            })
    }))
}
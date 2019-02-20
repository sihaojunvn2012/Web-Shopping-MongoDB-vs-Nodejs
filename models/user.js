
const GetDb = require('../util/database').GetDb;
const mongodb = require('mongodb');


const ObjectId = mongodb.ObjectId;


module.exports = class User {

    constructor(username, mail) {
        this.username = username;
        this.mail = mail;

    }

    save() {

        const db = GetDb();

        let dbUser = db.collection('Users')
            .insertOne(this)
            .then(User => {

                console.log(User);
                return User;

            })
            .catch( err =>{
                console.log(err);
            })

         return dbUser ;  


    }

    static findByID(UserId) {
        
        const db = GetDb();

        let dbUser = db.collection('Users')
                     .findOne({_id : new ObjectId(UserId)})
                     .then(User =>{
                         console.log(User);   
                        return User;
                     })
                     .catch( err =>{
                         console.log(err);
                     }) 
                     
         return dbUser;            
    }

}


const Cart = require('./cart');
const GetDb = require('../util/database').GetDb;
const mongodb = require('mongodb');





module.exports = class Product {
    // constructor properties    
    constructor(title, imageURL, Price, Description) {

        this.Title = title;
        this.ImageURL = imageURL;
        this.Price = Price;
        this.Description = Description;
    }

    //Create Table and Insert Data with Collection and InsertOne 
    save() {

        
        const db = GetDb();
        return db
            .collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // })
    static fetchAll() {
        const db = GetDb();
        return db 
           // Connect To Products 
          .collection('products')
           // Find Value of Data like Filter 
          .find()
          // Get All Documents and Turn Them into Javascript Array 
          .toArray()
          .then( products =>{
            console.log("OK");           
            return products;
            
          })
          .catch(err =>{

            console.log(err);

          });         


    }
    static FindById(productId) {
        const db = GetDb();

        return db
        .collection('products')
        // if you want Object Cast , you should use new ongodb.
        // ObjectID  it will covert from string to object on MogoDB         
        .find({_id: new mongodb.ObjectID(productId)})
        .next()
        .then( product =>{
            console.log(product);            
            return product;
        })
        .catch(err =>{

            console.log(err);
        })
    }

    static DeletePrductID(productId) {
        const db = GetDb();
        return db 
        .collection('products')
        .deleteOne({_id : new mongodb.ObjectId(productId)})        
        .then(product =>{
            console.log(product);
        })
        .catch(err=>{
            
            console.log(err);          

        })
    }
    // Get Data From products.json than we will pass into view
}
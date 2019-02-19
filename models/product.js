const Cart = require('./cart');
const GetDb = require('../util/database').GetDb;




const GetProductFromFile = callback => {


    fs.readFile(p, (err, fileContent) => {

        // if it had error . we will reset Data Product , it will be become emty array
        if (err) {

            callback([]);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    });

}

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

            console.log(products);
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
        .find({_id:productId})
        .next()
        .then( product =>{
            console.log(product)
            return product;

        })
        .catch(err =>{

            console.log(err);

        })

    }




    static DeletePrductID(id) {
        GetProductFromFile(Elements => {

            const Product = Elements.find(p => p.ID === id);

            const UpdateProducts = Elements.filter(p => p.ID !== id);



            fs.writeFile(p, JSON.stringify(UpdateProducts), err => {
                if (!err) {

                    Cart.DeleteProduct(id, parseFloat(Product.Price));

                }
            });

        });
    }
    // Get Data From products.json than we will pass into view  


    // Find ID vs Use CallBack 
    static FindById(id, callback) {
        GetProductFromFile(element => {

            const Product = element.find(element => {
                if (element.ID === id) {

                    return element;
                }
            });
            callback(Product);

        });

    }


}


const path = require('path');
const fs = require('fs');
const Cart = require('./cart');
// find Data on local file 
const p = path.join(path.dirname(process.mainModule.filename), 'Data', 'products.json');


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
    constructor(id,title,imageURL,Price,Description) {
        this.ID = id;
        this.Title = title;
        this.ImageURL= imageURL;
        this.Price = Price;
        this.Description = Description;
    }

    // method object oriented programming
    save() {       
        // console.log(p);
        // fs.readFile(p,(err,fileContent)=>{
        //     let products = [];
        //     if(!err){
        //         // if we use JSON.parse than it become  JSON , if it hadn't JOSON.parse than we will see one line Buffer like <Buffer 5b 0d 0a 20 20 20 20 7b 0d 0a 20 20 20 20 20 20 20 20 22 54 69 74 6c 65 22 3a 20 22 42 6f 6f 6b 73 22 0d 0a 0d 0a 20 20 20 20 7d 2c 0d 0a 20 20 20 20 ... >
        //         // "this" is these contrustor  
        //         console.log(JSON.parse(fileContent));
        //         products = JSON.parse(fileContent);
        //         console.log();
        //     }

        GetProductFromFile(products => {
            if ( this.ID)
        {
            console.log(this.ID);
            console.log(products);
            const existingProductIndex = products.findIndex( p => p.ID === this.ID );
           

            const UpdateProduct = [...products]

            UpdateProduct[existingProductIndex] = this ;            
            fs.writeFile(p, JSON.stringify(UpdateProduct), (err) => {
                if (err) {
    
                    console.log(err);
    
                }
            });
        }

        else{
            this.ID =  'M'+Math.floor((Math.random() * 1000000) + 1);
            products.push(this);
            console.log(products);
            // when i update Array Of Data  at that time , we must  update Data.JSON again by writeFlie. it make Update Data JSON 
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
    
                    console.log(err);
    
                }
            });
        } 
            
        });
    }
// })


    static DeletePrductID (id) {
        GetProductFromFile( Elements =>{

            const Product = Elements.find( p => p.ID === id);

            const UpdateProducts = Elements.filter(p => p.ID !==id);

            

            fs.writeFile(p, JSON.stringify(UpdateProducts), err => {
                if(!err){

                    Cart.DeleteProduct(id,parseFloat(Product.Price));

                }
            }); 

        });
    }
        // Get Data From products.json than we will pass into view  
    static fetchAll(callback) {
        GetProductFromFile(callback);
        }


       // Find ID vs Use CallBack 
    static FindById(id,callback){
        GetProductFromFile(element =>{

            const Product=element.find(element =>{
                if(element.ID===id){
                     
                    return element;
                }
            });
        callback( Product);     

        });

    }    


}
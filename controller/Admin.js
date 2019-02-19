const Product = require('../models/product');


exports.GetAddProduct = (req, res, next) => {
    res.render('Admin/add-product',
        {
            TitlePage: 'Add Product',
            Path: '/admin/add-product',
            Editing: false
        });
}
exports.PostAddProduct = (req, res, next) => {
    const Title = req.body.title;
    const ImageURL = req.body.imageURL;
    const Price = req.body.Price;
    const Description= req.body.Description;

    console.log(Title,ImageURL,Price,Description);    
    let pro_duct = new Product(null,Title,ImageURL,Price,Description);
    pro_duct.save();
    res.redirect('/');
}
exports.GetAdminProducts = (req, res, next) => {
    
    Product.fetchAll(product => {
        res.render('Admin/products',
            {
                TitlePage: 'Admin Products',
                Path: '/admin/products',
                prods: product
            }
        );
    });
}

exports.PostEditProduct = (req,res,next) =>{

      const ProductId = req.body.productId;
      const Title = req.body.title;  
      const ImageURL = req.body.imageURL;
      const Price = req.body.Price;
      const Description= req.body.Description;      
      const EditProduct= new Product(ProductId,Title,ImageURL,Price,Description);
      EditProduct.save();     

      res.redirect('/admin/products');
}

exports.GetEditProduct = (req, res, next) => {

    const EditMode = req.query.Edit;
    // const ID = req.body.productId;       
    const ID = req.params.ID 
   
    if(!EditMode){

       res.redirect('/'); 

    }
    else{
        console.log(ID);
        Product.FindById(ID,Product=>{
            
            res.render('Admin/add-product',
            {
                TitlePage: 'Edit Product',
                Path: '/admin/edit-product',
                Editing: EditMode,
                product: Product
                
            });

        //   res.redirect('/');  
        })
      

    }   
}


exports.PostDeleteProduct = (req, res, next) => {

    const ID = req.body.productId;
    
    console.log(ID);
    
    Product.DeletePrductID(ID);

    res.redirect('/admin/products');


}; 
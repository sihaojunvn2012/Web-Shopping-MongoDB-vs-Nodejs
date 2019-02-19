const Product = require('../models/product');
const Cart = require('../models/cart');





exports.Get_Product_List = (req, res, next) => {




    Product.fetchAll().
        then(products => {

            res.render('Shop/product-list',
                {

                    prods: products,
                    TitlePage: 'Products',
                    Path: '/Products',

                });


        })




    // res.sendFile(path.join(rootDir,'view','shop.ejs'));    
}

exports.Get_Index = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('Shop/index',
                {

                    prods: products,
                    TitlePage: 'Shop',
                    Path: '/'
                });
        })
        .catch( err =>{

            console.log(err);

        })
}




// Dynamic Routes 
exports.Get_Product = (req, res, next) => {
            
        const ID = req.params.ProductID;

        Product.FindById(ID)
        .then( product =>{

                console.log(product);
                
            res.render('Shop/product-detail', {

                Product: product,
                Path: `/Products/${product._id}`,
                TitlePage: 'Product Detail'
            })
        })
}


exports.Post_Cart = (req, res, next) => {

        const ID = req.body.productId;


        Product.FindById(ID, Product => {

            Cart.AddProduct(ID, parseFloat(Product.Price));

        });
        res.redirect('/Cart');
    }

exports.Get_Cart = (req, res, next) => {

        Cart.GetCart(cart => {
            Product.fetchAll(Products => {

                let CartProducts = [];

                for (product of Products) {


                    const CartProductData = cart.Products.find(p => p.id === product.ID);

                    if (CartProductData) {

                        CartProducts.push({ productData: product, qty: CartProductData.qty });

                    }
                }
                console.log(CartProducts);
                res.render('Shop/cart', {

                    TitlePage: 'Cart',
                    Path: '/Cart',
                    Products: CartProducts
                });
            });


        });
    }

exports.Post_Delete_Cart_Item = (req, res, next) => {

        const ID = req.body.productId;

        Product.FindById(ID, Item => {

            Cart.DeleteProduct(ID, parseFloat(Item.Price));


        });

        res.redirect('/');
    };


exports.getCheckout = (req, res, next) => {
    res.render('Shop/checkout', {
        Path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('Shop/orders', {
        Path: '/orders',
        TitlePage: 'Your Orders'
    });
};


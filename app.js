const express = require('express');
const app = express();
const port = 3000;
const mongoConnect = require('./util/database').mongoConnect;
const bodyParser = require('body-parser');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controller/error404');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.GetError404);

mongoConnect( Client =>{
    
    app.listen(port);

})
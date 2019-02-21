const express = require('express');
const app = express();
const port = 3000;
const mongoConnect = require('./util/database').mongoConnect;
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controller/error404');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {


    User.findByID('5c6ccd2ede37d1415809381b'). 
        then(user => {
          // Set Request User when who will req User, it have to reply value for us           
            
            req.user = new User(user._id ,user.username, user.mail,user.cart);          
            next();
        })
        .catch(err => {

            console.log(err);

        })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.GetError404);

mongoConnect(Client => {

    app.listen(port);

})
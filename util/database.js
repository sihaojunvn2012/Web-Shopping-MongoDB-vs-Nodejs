const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;



let _db; 

const mongoConnect = callback =>{

MongoClient.connect('mongodb+srv://DinhHuy_1996:Professionalhuy@severwebshop-xbrlk.mongodb.net/test?retryWrites=true')
.then(client =>{    
    console.log('Connected!');    
    _db =client.db();    
    console.log(_db);
    callback();
})
.catch( err =>{
    console.log(err);
    throw err;

})
}

const GetDb = () =>{

    if(_db){
        return _db;
    }
    else{

        throw ' No database found! '
    }
}
exports.mongoConnect = mongoConnect;
exports.GetDb  = GetDb;





let express = require('express');
let morgan = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require( "body-parser" );
let jsonParser = bodyParser.json();
let uuid = require('uuid');
let {TestMethods} = require('./model.js');
let {DATABASE_URL, PORT} = require('./config.js');

let app = express();
app.use(express.static("public"));
app.use(morgan("dev"));

// CORS

app.get('/testcases' (req, res) =>{
    TestMethods.getTCs()
        .then( tests =>{
            return res.status(200).json(tests);
        })
        .catch( error =>{
            return res.status(500).json({
                status: 500,
                message: "Something whent wrong with the TcDb"
            });
        })
});

app.put('/testcases', jsonParser, (req, res) =>{
    let title = req.body.title;
    let content = req.body.title;
    let author = req.body.author;
    let date = req.body.publishDate;

    if(!title | !content | !author | !date){
        return res.status(406).json({
            message: "Missing field in body",
            status: 406
        });
    }

    let newTC = {
        id: uuid(),
        title: title,
        content: content,
        author: author,
        publishDate: date
    }

    TestMethods.postTC(newTC)
        .then( tests => {
            return res.status(200).json(tests)
        })
        .catch( tests => {
            return res.status(500).json({
                message: "Someting whent wrong with the TcDb",
                status: 500
            });
        });
});

function runServer(port, databaseUrl){
    return new Promise( (resolve, reject ) => {
    mongoose.connect(databaseUrl, response => {
    if ( response ){
    return reject(response);
    }
    else{
    server = app.listen(port, () => {
    console.log( "App is running on port " + port );
    resolve();
    })
    .on( 'error', err => {
    mongoose.disconnect();
    return reject(err);
    })
    }
    });
    });
}
   
function closeServer(){
    return mongoose.disconnect()
    .then(() => {
    return new Promise((resolve, reject) => {
    console.log('Closing the server');
    server.close( err => {
    if (err){
    return reject(err);
    }
    else{
    resolve();
    }
    });
    });
    });
}
   
runServer( PORT, DATABASE_URL )
    .catch( err => {
    console.log( err );
});
      
module.exports = { app, runServer, closeServer };
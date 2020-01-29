let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let schema = mongoose.Schema({
    id: {type : String},
    title: {type : String},
    content: {type: String},
    author: {type: String},
    publishDate: {type: Number}
});

let TestCollection = mongoose.model("Test", schema);

let TestMethods = {
    getTCs : function(){
        return TestCollection.find()
            .then( tests => {
                return tests;
            })
            .catch( error => {
                trow Error( error );
            });
    }
    postTC: function(newTC){
        return TestCollection.create(newTc)
            .then( tests => {
                return tests;
            })
            .catch( error => {
                trow Error(error);
            });
    }
    putTC: function(filter, newTC){
        return TestCollection.updateOne(filter, newTC)
            .then( test =>{
                return test;
            })
            .catch( error =>{
                trow Error(error);
            });
    }
    deleteTC: function(filter){
        return TestCollection.deleteOne(filter)
            .then( tests => {
                return tests;
            })
            .catch( error => {
                trow Error(error);
            });
    }
}

module.exports = {TestMethods};
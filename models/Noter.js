var mongoose = require('mongoose');

var NoterShema = new mongoose.Schema({
    firebaseUserId : String,
    notes: [Object]
},{collection:'noters'})
mongoose.model('Noter',NoterShema);
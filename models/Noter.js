var mongoose = require('mongoose');

var NoterShema = new mongoose.Schema({
    firebaseUserId : String,
    notes: [Object]
})
mongoose.model('Noter',NoterShema);
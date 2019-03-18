var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Noter = mongoose.model('Noter');

//The route to receive a noter
router.get('/API/noters/:id', function (req, res, next) {
  Noter.find({ "firebaseUserId": req.params.id }, function (err, noter) {
    if (err) {
      return next(err)
    }
    if (!noter) {
      return next(new Error('Noter not found ' + req.params.id));
    }
    return res.json(noter);
  })
});


//The route to update a users notes
router.put('/API/noters/:id', function (req, res, next) {
 
  Noter.findOneAndUpdate({firebaseUserId: req.params.id},{$push: {notes: req.body}}, function(err, noter){
    if (err) {
      return res.status(400).json({ message: "Noter wasn't found" });
    } else {
      res.json({ success: 'Note added' });
    }
  });
 });

 

module.exports = router;

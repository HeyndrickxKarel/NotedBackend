var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Noter = mongoose.model('Noter');

router.get('/', function(req, res, next){
  return res.send('Hi!');
})
router.get('/allnoters', function(req,res,next){
  Noter.find(function(err, noters){
    if (err){
      return next(err);
    }
    return res.json(noters);
  });
})
//The route to create a noter
router.post('/API/noters/', function(req, res, next){
  let noter = new Noter({
    firebaseUserId: req.body.firebaseUserId,
    notes: [firstNote],
    });
  noter.save(function(err,rec){
    if(err){return next(err);}
    res.json(rec);
  })
})

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


//The route to add a users note
router.put('/API/noters/:firebaseUserId', function (req, res, next) {
 
  Noter.findOneAndUpdate({firebaseUserId: req.params.firebaseUserId},{$push: {notes: req.body}}, function(err, noter){
    if (err) {
      return res.status(400).json({ message: "Noter wasn't found" });
    } else {
      res.json({ success: 'Note added' });
    }
  });
 });

 //The route to update a users notes
router.put('/API/noters/update/:firebaseUserId', function (req, res, next) {
 
  Noter.findOneAndUpdate({firebaseUserId: req.params.firebaseUserId},{notes: req.body}, function(err, noter){
    if (err) {
      return res.status(400).json({ message: "Noter wasn't found" });
    } else {
      res.json({ success: 'Notes updated' });
    }
  });
 });

 let firstNote = {
  "type": "doc",
  "dateCreated":new Date(),
  "content": [
    {
      "type": "heading",
      "attrs": {
        "level": 1
      },
      "content": [
        {
          "type": "text",
          "text": "Hi there, this is noted!"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "You can do al kinds of stuff here like add "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "Bold"
        },
        {
          "type": "text",
          "text": ", "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "italic"
            }
          ],
          "text": "italic"
        },
        {
          "type": "text",
          "text": " or underline stuff. "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Or add some "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "code"
            }
          ],
          "text": "code"
        },
        {
          "type": "text",
          "text": " like so"
        }
      ]
    },
    {
      "type": "code_block",
      "content": [
        {
          "type": "text",
          "text": "alert(\"I'm awesome!'\");"
        }
      ]
    }
  ]};

module.exports = router;

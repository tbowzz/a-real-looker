var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Face = mongoose.model('Face');

// Faces GET
router.get('/faces', function(req, res, next) {
  Face.find(function(err, faces){
    if(err){ return next(err); }
    res.json(faces);
  });
});

// Faces POST
router.post('/faces', function(req, res, next) {
  var face = new Face(req.body);
  face.save(function(err, face){
    if(err){ return next(err); }
    res.json(face);
  });
});

// Face DELETE
router.delete('/faces/:face', function(req, res) {
  console.log("in Delete");
  req.face.remove();
  res.sendStatus(200);
});

// Find Face by param
router.param('face', function(req, res, next, id) {
  var query = Face.findById(id);
  query.exec(function (err, face){
    if (err) { return next(err); }
    if (!face) { return next(new Error("can't find face")); }
    req.face = face;
    return next();
  });
});

router.get('/faces/:face', function(req, res) {
  res.json(req.face);
});

// Upvote a face by its ID
router.post('/vote/:face', function(req, res, next) {
  req.face.vote(req.body, function(err, face){
    if (err) { return next(err); }
    res.json(face);
  });
});

module.exports = router;

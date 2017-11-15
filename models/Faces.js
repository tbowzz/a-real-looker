var mongoose = require('mongoose');
var FaceSchema = new mongoose.Schema({
  image: String,
  ranking: {type: Number, default: 0},
});
FaceSchema.methods.vote = function(cb) {
    console.log("In Schema, cb= " + cb);
    this.rating += 1;
    this.save(cb);
  };
mongoose.model('Face', FaceSchema);
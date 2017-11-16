var mongoose = require('mongoose');
var FaceSchema = new mongoose.Schema({
  image: String,
  rating: {type: Number, default: 0},
  total: {type: Number, default: 0},
  votes: {type: Number, default: 0},
});
FaceSchema.methods.vote = function(body, cb) {
    this.votes += 1;
    this.total += (parseInt(body.rating) / 10);
    this.rating = (this.total / this.votes);
    this.save(cb);
  };
mongoose.model('Face', FaceSchema);
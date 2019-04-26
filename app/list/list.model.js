var mongoose = require('mongoose');
// Setup schema
var listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  items: [{type: ObjectId, ref: 'Item'}],
  shared_with: [{type: ObjectId, ref: 'Contact'}],
  owner: ObjectId,
});
// Export Contact model
var List = module.exports = mongoose.model('list', listSchema);
module.exports.get = function (callback, limit) {
  List.find(callback).limit(limit);
}
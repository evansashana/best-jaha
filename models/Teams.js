var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  'name' : String
}, {collection : 'teams', discriminatorKey: 'kind', versionKey : false});

mongoose.set('collection', 'teams');
mongoose.model('Team', TeamSchema);

var mongoose = require('mongoose');

var JudgeSchema = new mongoose.Schema({
    'name' : String,
    'email' : String,
    'events_as_judge' : []
}, {collection : 'judges', discriminatorKey: 'kind', versionKey : false});

mongoose.set('collection', 'judges');
mongoose.model('Judge', JudgeSchema);

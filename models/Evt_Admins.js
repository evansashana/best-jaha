var mongoose = require('mongoose');

var Evt_AdminSchema = new mongoose.Schema({
    'name' : String,
    'email' : String,
    'events_as_admin' : []
}, {collection : 'evt_admins', discriminatorKey: 'kind', versionKey : false});

mongoose.set('collection', 'evt_admins');
mongoose.model('Evt_AdminSchema', Evt_AdminSchema);

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    evt_id: String,
    name: String,
    location: String,
    event_host: String,
    start_date: Date,
    end_date: Date,
    judges: [],
    criteria: [],
    max_scale: Number,
    scores: []
}, { collection : 'events', discriminatorKey: 'kind', versionKey : false });

mongoose.set('collection', 'events');
mongoose.model('Event', EventSchema);

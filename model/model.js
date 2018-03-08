var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blacklist = new Schema({
    MSISDN: {
        type: Number,
        required: true,
        unique: true
    },
    Operator: {
        type: String,
        required: true
    },
    Categories: String,
    date_updated: {
        type: Date,
        default: Date()
    }
});

var Admin = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

var Blacklist = mongoose.model('Blacklist', Blacklist);
var Admin = mongoose.model('Admin', Admin);

// // module.exports = {
// //     Blacklist: Blacklist
// // };
// module.exports = {
//     Admin: Admin
// };
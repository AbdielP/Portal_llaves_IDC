var mongoose = require('mongoose');

var UserDetail =  new mongoose.Schema({
	username: String,
	password: String
});

const UserDetails = mongoose.model('idcusers', UserDetail, 'idcusers');

module.exports = UserDetails;
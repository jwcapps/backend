'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const Url = new Schema({
	id: {
	    type: String,
	    unique: true,
	    'default': () => ('000' + Math.floor((Math.random() * 1679616)).toString(36).toUpperCase()).slice(-4)
	},
	redirect: String
});

module.exports = mongoose.model('Url', Url);

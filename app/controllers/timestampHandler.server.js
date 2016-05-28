'use strict';

let moment = require('moment')

function TimestampHandler () {

	this.getTimestamp = function (req, res) {
	    let timestamp = req.params.timestamp.replace('%20', ' '),
	        date

	    if (/^\-?[0-9]+$/.test(timestamp)) {
	        // unix timestamp
	        date = new Date(parseInt(timestamp))
	    } else {
	        // natural language
	        date = new Date(timestamp)
	    }

	    if (isNaN(date)) {
	        res.json({"unix": null, "natural": null})
	    } else {
            res.json({"unix": date.getTime(),
                "natural": moment(date).format("MMMM DD, YYYY")})
	    }
	};

}

module.exports = TimestampHandler;

'use strict';

let moment = require('moment')

function WhoamiHandler () {

	this.getTimestamp = function (req, res) {
        res.json({"ipaddress":"50.134.239.222","language":"en-US","software":"Windows NT 10.0; Win64; x64"})
	};

}

module.exports = WhoamiHandler;

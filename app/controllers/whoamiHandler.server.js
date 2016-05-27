'use strict';

function WhoamiHandler () {

	this.getWhoami = function (req, res) {
		let ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress
		let language = (req.headers['accept-language'] || '').split(',')[0]
		let os = req.get('User-Agent').match(/\(([^\)]+)\)/)[1]
        res.json({"ipaddress": ip, "language": language, "software":os})
	};

}

module.exports = WhoamiHandler;

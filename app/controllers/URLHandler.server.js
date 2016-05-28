'use strict';

const Urls = require('../models/urls.js')
	, validUrl = require('valid-url')

function URLHandler() {

	this.getURL = function(req, res) {
	    let input = req.params[0]

	    if (!validUrl.isUri(input)) {
            return res.json({"error":"Invalid url format."})
	    }

		const query = {redirect: input}
			, update = {}
			, options = {upsert: true, new: true, setDefaultsOnInsert: true}

		Urls.findOneAndUpdate(query, update, options, (error, result) => {
			if (error) {
            	res.json({"error":"Invalid url format."})
			} else {
        		res.json({"original_url": input, "short_url": process.env.APP_URL + 'url/' + result.id})
			}
		})
	};

	this.redirect = function(req, res) {
		Urls.findOne({id: req.params.id}, (error, url) => {
			if (error) {
				res.json({"error": "This url is not in the database."})
			} else {
				res.redirect(url.redirect)
			}
		})
	}

}

module.exports = URLHandler;
'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
const TimestampHandler = require(path + '/app/controllers/timestampHandler.server.js')
const WhoamiHandler = require(path + '/app/controllers/whoamiHandler.server.js')
const URLHandler = require(path + '/app/controllers/URLHandler.server.js')


module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/timestamp')
		.get((req, res) => res.sendFile(path + '/public/timestamp.html'));

	app.route('/timestamp/:timestamp')
		.get(new TimestampHandler().getTimestamp)

	app.route('/api/whoami')
		.get(new WhoamiHandler().getWhoami);

	app.route('/url')
		.get((req, res) => res.sendFile(path + '/public/tinyurl.html'));

	app.route(/\/url\/new\/(.+)/)
		.get(new URLHandler().getURL)

	app.route('/url/:id')
		.get(new URLHandler().redirect);




	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};

var User = require('mongoose').model('User');
//console.log('loaded User model: ' + User);

exports.create = function(req, res, next) {
	console.log('Creating user!');
	var user = new User(req.body);
	console.log('Created new user var! ' + user);
	user.save(function(err) {
		if(err){
			console.log('Error creating user!');
			return next(err);
		}else{
			console.log('Was able to create user!');
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	console.log('Finding users!');
	User.find({}, function(err, users) {
		if(err){
			console.log('Error finding users!');
			return next(err);
		}else{
			console.log('Found users, now returning!');
			res.json(users);
		}
	});
};
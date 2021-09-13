const loki = require('lokijs');

function initDB(cb) {
	console.log('Initializing DB...');
	const db = new loki('greeter.db');

	db.loadDatabase({}, (err) => {
		// Handle DB loading error
		if (err) {
			return cb(err);
		}

		// Bring in Models

		/**
         * User
         * uid: genarated
         * role: [user, visitor]
         * email: email address of user
         * fullname?: required only for user role
         * username?: required only for user role
         * password: (stored as hash)
         * avatar?: path to profile picture
         * following: list of uids of followed users
         * followCount: number of followers
         * greetCount: number of greets
         * regDate: registration date from new Date()
         */
		let userModel = db.getCollection('user');
		if (userModel === null) {
			userModel = db.addCollection('user', {
				indices: ['uid', 'email', 'username'],
				unique: ['uid', 'email', 'username'],
			});
		}

		/**
         * Greet
         * gid: genarated
         * uid: uid of owner (user)
         * likerIDs: list of uid of likers (user)
         * likerCount: number of likers
         * regreetOf?: if it’s a regreet gid of regreet-ed greet
         * text: text of greet
         * date: date of greet from new Date()
         * pics: list of path of pics
         * visibility: [public, restricted]
         * commentCount: count of comments
         */
		let greetModel = db.getCollection('greet');
		if (greetModel === null) {
			greetModel = db.addCollection('greet', {
				indices: ['gid'],
				unique: ['gid'],
			});
		}

		/**
         * Comment
         * cid: genarated
         * gid: gid of greet the comment belongs to
         * uid: uid of commenter (user)
         * text: text of comment
         * date: date of comment from new Date()
         */
		let commentModel = db.getCollection('comment');
		if (commentModel === null) {
			commentModel = db.addCollection('comment', {
				indices: ['cid'],
				unique: ['cid'],
			});
		}

		// Save Database on successful loading and return Models
		db.saveDatabase((err) => {
			if (err) {
				return cb(err);
			}
			console.log('DB saved after initialization.');
			return cb(undefined, { userModel, greetModel, commentModel });
		});
	});
}

module.exports.initDB = initDB;

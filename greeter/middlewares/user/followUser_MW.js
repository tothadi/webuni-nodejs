/**
 * Add user to followed list
 *
 * 1. follower = Find user in DB by session.uid
 * 2. followed = res.locals.user
 * 3. Push follower.following(followed.id)
 * 4. Increase followed.followCount by 1
 * 5. Save to DB and redirect back
 * @param {*} objRep
 * @returns
 */
module.exports = (objRep) => {
	const { saveToDB } = objRep;
	return (req, res, next) => {
		try {
			if (res.locals.userIn.following.includes(res.locals.user.uid)) {
				let index = res.locals.userIn.following.indexOf(res.locals.user.uid);
				res.locals.userIn.following.splice(index, 1);
                res.locals.user.followCount--;
			} else {
				res.locals.userIn.following.push(res.locals.user.uid);
				res.locals.user.followCount++;
			}
		} catch (err) {
			if (err) return next(err);
		}
		saveToDB();
		return res.redirect(`/profile/${res.locals.user.uid}`);
	};
};

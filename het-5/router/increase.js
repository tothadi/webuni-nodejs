module.exports = () => {
    return (req, res, next) => {
        if (!req.session.counter) {
            req.session.counter = 0;
        }
        req.session.counter++;
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            return res.redirect('/after-increase');
        });
    }
}
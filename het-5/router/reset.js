module.exports = () => {
    return (req, res, next) => {
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            console.log(req.session);
            return res.redirect('/after-reset');
        });
    }
}
const passport = require('passport');

const gitHubAuth = passport.authenticate('github', { scope: ['user:email'] });
const gitHubCallback = passport.authenticate('github', {
    failureRedirect: '/auth/login'
});

const handleCallBack = (req, res) => {
    res.redirect('/homePage');
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).json({message: 'Failed to logout.'});
        }
        res.redirect('/');
    })
};

const getProfile = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: {
                id: req.user._id,
                gitHubID: req.user.gitHubID,
                username: req.user.name,
                displayName: req.user.displayName,
                email: req.user.email,
                avatar: req.user.avatar
            }
        });
    } else {
        res.json({ authenticated: false});
    }
};

const checkAuth = (req, res, next) => {
    if (req.authenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Authentication required'});
};



module.exports = {
    gitHubAuth,
    gitHubCallback,
    handleCallBack,
    logout,
    getProfile,
    checkAuth
};
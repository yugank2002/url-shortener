const{getUser} = require('../services/auth');

const restrictToLoggedInUsersOnly = (req, res, next) => {
    
    const token = req.cookies?.uid;

    if (!token ) {
        return res.send(`
            <h1>You Need to Login to Create URL</h1>
            <p>Redirecting to login page in 5 seconds...</p>
            <script>
                setTimeout(() => {
                window.location.href = '/login';
                }, 5000);
            </script>
        `);
    }

    const user = getUser(token);
    
    if (!user) {
         return res.send(`
            <h1>You Need to Login to Create URL</h1>
            <p>Redirecting to login page in 5 seconds...</p>
            <script>
                setTimeout(() => {
                window.location.href = '/login';
                }, 5000);
            </script>
        `);
    }

    req.user = user; // Attach user to request object
    next();
}

const checkAuthentication = (req, res, next) => {
    const token = req.cookies?.uid;

    const user = getUser(token);

    req.user = user; // Attach user to request object
    next();
}

module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuthentication
};

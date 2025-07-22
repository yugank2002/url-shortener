const {User} = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../services/auth');

const handleUserSignup = async(req, res) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({email: email});
    
    if(user){
        const html = `<h1>User already exists</h1>
        <p>Name:${user.name}</p>
        <p>Email:${user.email}</p>
        <p>Please try logging in instead.</p>`
        return res.end(html);
    }
   await User.create({
        name: name,
        email: email,   
        password: password
   })
   .then(()=>{
        res.send(`
            <h1>User Created Successfully</h1>
            <p>Redirecting to login page in 5 seconds...</p>
            <script>
                setTimeout(() => {
                window.location.href = '/login';
                }, 5000);
            </script>
        `);
   })
    .catch((err)=>{
          console.error(err.message);
          res.status(500).send('Internal Server Errorrrrrrrrrrr');
    });

}

const handleUserLogin = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email, password: password});

    if(!user){
         const html = `<h1>Wrong Credentials</h1>
        <p>Please try logging in again.</p>`
        return res.end(html);
    }

    
    const token = setUser(user);
    res.cookie('uid', token, {
        httpOnly: true,
    });


     res.redirect('/');
}

const handleUserLogout = (req, res) => {
    res.clearCookie('uid');
    res.redirect('/login');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};
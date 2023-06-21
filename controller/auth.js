const User = require("../models/user")

module.exports = function (app) {
    app.get('/sign-up', (req,res)=>{
        res.render('sign-up')
    })
    app.post("/sign-up", (req, res)=>{
        const newUser = req.body;
        // save it to DB
        // redirect to index
        User.create(newUser)
        .then((user)=>{
            res.redirect('/')
        }).catch(err => console.log(err))

    })
}
const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getHome = (req, res, next) => {
    res.render("index")
};

exports.getRegister = (req, res, next) => {
    res.render("register")
};

exports.postRegister = (req, res, next) => {
    const { email, password, confirmPassword } = req.body

    User.find({ email: email }).then(user => {
            if (user) {
                return res.redirect('/register')
            }
            if (password != confirmPassword) {
                return res.redirect('/register')
            }
            if (password.length < 8) {
                return res.redirect('/register')
            }
            bcrypt.hash(password, confirmPassword, 13).then(hashedPass => {
                    const newUser = new User({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: hashedPass,
                        confirmPassword: hashedPass
                    })
                    newUser.save().then(() => {
                            res.redirect('/')
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}
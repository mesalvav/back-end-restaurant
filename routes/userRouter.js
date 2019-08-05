const express     = require('express');
const router      = express.Router();

const User        = require('../models/user');

const bcrypt      = require('bcryptjs');

const passport    = require('passport');


router.post('/signup', (req, res, next) => {
    const userNameVar = req.body.username;
    const password = req.body.password;
  
    if (!userNameVar || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    // if(password.length < 7){
    //     res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
    //     return;
    // }
    // this is not for testing only add something like this after the featurw works correctly
  
    User.findOne({ username:userNameVar }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            username:userNameVar,
            password: hashPass
        });
  
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
            

                res.status(200).json({message: 'SSuccessfully logged in'});
            });
        });
    });
});

module.exports = router;
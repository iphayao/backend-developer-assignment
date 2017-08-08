var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport) {
    // passport need to be able to serialize and deserialize users to support presitanct loging sessions
    passport.serializeUser(function(user, done) {
        console.log('username', user.username);
        console.log('serialize user:', user._id);
        done(null, user._id);
    });

    // deserialize
    passport.deserializeUser(function(user, done) {
        User.findById(id, function(err, user) {
            console.log('deserialize user:', id);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
        },
        function(req, username, passport, done) {
            User.findOne({'username': username}, function(err, user) {
                if(err) {
                    return done(err);
                }

                // if no user with username
                if(!user) {
                    console.log('user not found with username ' + username);
                    return done(null, false);
                }

                // if invalid password
                if(!isValidPassword(user, password)) {
                    console.log('incorrect password');
                    return done(null, false);
                }
            });
        })
    );

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
        },
        function(req, username, passport, done) {
            User.findOne({'username': username}, function(err, user) {
                if(err) {
                    return done(err);
                }

                if(user) {
                    // we have singed up this user
                    console.log('user already exist with username: ' + user.username);
                }
                else {
                    var user = new User();
                    user.username = username;
                    user.password = createHash(password);

                    user.save(function(err, user) {
                        if(err) {
                            console.log('error is saving user ' + err);
                            throw err;
                        }
                        console.log('successfully signed up user ' + username);
                        return done(null, user);
                    });
                }
            });
        })
    );

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }

    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSalt(10), null);
    }
};
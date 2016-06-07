var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var models = require('../models/index');

var User = models.User ;

/*
define our strategy
 */




passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    User
        .find({ username: username })
        .then(function(user) {
            done(null, user);
        });
});





passport.use(new localStrategy({
   usernameField: 'email',
   passwordField: 'password'
},function(email,password,done){



            User.findOne({where:{email:email}}).then(function(user){




                if(!user){
                    return done(null, false,{"message":"incorrect UserName!"});
                }
                else{

                    if(!user.validPassword(password)){
                        return done(null, false,{"message":"incorrect Password!"});
                    }

                    else{


                    return done(null,user);}


                }


            })




}


    )

)
var express = require('express');
var router = express.Router();
var passport = require('passport');

var models = require('../models/index');

var User = models.User ;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./app_client/index.html',{'root':'/home/ahmed/Mean_Stack_projects/Authentication_App/public'})
});


/*
 declare the jwt
 */
var jwt = require('express-jwt');  // for the protected routes

var authUser = jwt({
  secret: 'secret_User'

});

/*
define the routes
 */


router.post('/login', function(req,res,next){


  passport.authenticate('local', function(err,user, info){


    if(user){
      var token =user.generateJwt()
      return res.json({"token":token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);

})



router.post('/Register', function(req,res){
/*
get all data
 */
  var email = req.body.email ;
  var username = req.body.username ;
  var password = req.body.password ;

  /*
  check if user exist
   */


  User.findOne({where :{email:email}}).then(function(user){


    if(user){

      res.json({"err_create":"CREATE_ALREADY_HAVE_ACCOUNT"});
    }else{

      //non persistent user
      var user = User.build({email:email,username:username})

      user.setPassword(password);
      user.save().then(function(){

        //generate the token
        var token = user.generateJwt();
        res.status(200).json({"token":token});

      })

    }



  }).catch(function(err){
    res.json(err);
  })


})



/*
aceess to profile
 */





//protected route

router.get('/profile',authUser, function(req,res){



  if (!req.user) {

    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  }
  else{

User.findById(req.user._id).then(function(user) {

  if (!user) {
    res.status(401).json("err");

  } else {
    res.status(200).json(user);

  }




}).catch(function(err){
  res.json(err);
})



  }//edn fo else
})



module.exports = router;

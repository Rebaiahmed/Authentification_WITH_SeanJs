var express = require('express');
var router = express.Router();

var models = require('../models/index');

var User = models.User ;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./app_client/index.html',{'root':'/home/ahmed/Mean_Stack_projects/Authentication_App/public'})
});




/*
define the routes
 */


router.post('/api/login', function(req,res){


})



router.post('/api/Register', function(req,res){
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
      

    }else{

    }



  })


})



router.get('/api/profile/:idUser', function(req,res){
  var idUser = req.params.idUser ;


})



module.exports = router;

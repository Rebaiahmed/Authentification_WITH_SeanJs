angular
    .module('AuthenticationApp').factory('Auth',['$http','$window', 'jwtHelper',function($http,$window,jwtHelper){


        var auth ={};

        auth.saveToken = function(token){

            $window.localStorage['User-token'] = token;
        }

        auth.getToken = function(){

             return $window.localStorage['User-token'];
        }


        auth.login = function(user){

            return $http.post('/login', user).then(function(data){

                auth.saveToken(data.data.token);
            })

        }






        auth.logOut = function(){
            $window.localStorage.removeItem('User-token');
        }

        auth.register = function(user){

           return $http.post('/Register', user).success(function(data){

               var obj = {"err_create": "CREATE_ALREADY_HAVE_ACCOUNT"};

               if(JSON.stringify(data) === JSON.stringify(obj))
               {

               }
               else {
                   auth.saveToken(data.token);
               }
            })
        }


        auth.currentUser = function(){


           if(auth.isloggedIn()){


                var token = auth.getToken();


                //use Provider jwthelper to decode the token
              var tokenPayload = jwtHelper.decodeToken(token);


               return {
                   email : tokenPayload.email,
                   username : tokenPayload.username
               };



            }




        }





        auth.isloggedIn = function() {
            var token = auth.getToken();



            //use Provider jwthelper to decode the token

          if (token) {




            //check if token is expired
           var bool = jwtHelper.isTokenExpired(token);


              if(bool){
                  return false
              }
              else{
                  return true;
              }

        }

        }





        auth.getProfile = function(){



                return $http.get('/profile', {
                    headers: {
                        Authorization: 'Bearer '+ this.getToken()
                    }
                });

        }






return auth;




    }])

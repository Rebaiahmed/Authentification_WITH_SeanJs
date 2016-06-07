angular
    .module('AuthenticationApp').controller('NavCtrl',['$scope','Auth','$window','$location', function($scope,Auth,$window,$location){

        //get the isloggedIN




        function veriflogged(){


            $scope.isloggedIn = Auth.isloggedIn();

            console.log('isloggedIN' +  $scope.isloggedIn);

            //get currentUser
            $scope.currentUser = Auth.currentUser();
        }

        veriflogged();



        $scope.logout = function(){



            Auth.logOut();
            $window.location.reload();
            $location.path('/');
        }


    }])
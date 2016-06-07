angular
    .module('AuthenticationApp').controller('loginCtrl',['$scope','Auth','$location','$window', function($scope,Auth,$location,$window){

        $scope.user ={};
        $scope.error ;

        $scope.onSubmit = function(){





            Auth.login($scope.user).then(function(){
                $window.location.reload();
                $location.path('profile');
            }, function(err){

                $scope.error = err;

            })



        }

    }])
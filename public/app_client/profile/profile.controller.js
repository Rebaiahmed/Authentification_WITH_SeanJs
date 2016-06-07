angular
    .module('AuthenticationApp').controller('profileCtrl',['$scope','Auth', function($scope,Auth){



        $scope.user = {};

        Auth.getProfile()
            .success(function(data){


                $scope.user = data ;

            }).error(function(err){
                console.log('err' + err);

            })



    }])
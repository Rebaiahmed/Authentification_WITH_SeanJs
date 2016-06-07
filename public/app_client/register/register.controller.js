angular
    .module('AuthenticationApp').controller('registerCtrl',['$scope','Auth','$location','$window', function($scope,Auth,$location,$window){

        $scope.user ={};
        $scope.error ;


        $scope.onSubmit = function(){

            Auth.register($scope.user).
                then(function(data){



                var obj = {"err_create": "CREATE_ALREADY_HAVE_ACCOUNT"};


                if (JSON.stringify(data.data) === JSON.stringify(obj)) {

                    $scope.error = true;
                    $scope.message = "email used !"
                }
                else{
                    $window.location.reload();
                    $location.path('profile');
                }

//if succed login to profile



            }, function(err){

                        console.log('err' + err)
                        $scope.error = err;


                })


        }

    }])
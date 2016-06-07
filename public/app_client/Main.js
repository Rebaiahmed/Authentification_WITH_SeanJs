









(function () {

    angular.module('meanApp', ['ngRoute']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app_client/home/home.view.html',
                controller: 'homeCtrl',

            })
            .when('/register', {
                templateUrl: '/app_client/register/register.view.html',
                controller: 'registerCtrl',

            })
            .when('/login', {
                templateUrl: '/app_client/login/login.view.html',
                controller: 'loginCtrl',

            })
            .when('/profile', {
                templateUrl: '/app_client/profile/profile.view.html',
                controller: 'profileCtrl',

            })
            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
       // $locationProvider.html5Mode(true);
        //$locationProvider.html5Mode(true).hashPrefix('*');
    }

    function run($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !Auth.isloggedIn()) {
                $location.path('/');
            }
        });
    }

    angular
        .module('AuthenticationApp',['ngRoute','angular-jwt'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'Auth', run]);

})();

(function() {
        'use strict'


        angular
            .module('coffeeGame')
            .config(['$routeProvider',
                function($routeProvider) {
                        $routeProvider.
                        when('/index', {
                                templateUrl: 'app/pages/game/game.html'
                        }).
                        when('/login', {
                                templateUrl: 'app/pages/login/login.html'
                        }).
                        when('/register', {
                                templateUrl: 'app/pages/register/register.html'
                        }).
                        otherwise({
                                redirectTo: '/index'
                        });
                }
        ]);
})();

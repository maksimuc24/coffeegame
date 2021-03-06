(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('authenticationService', authenticationService)

        authenticationService.$inject = ['$http', 'serverUrl'];

        function authenticationService($http, serverUrl) {
                var urlBase = serverUrl + '/authentication';
                var dataFactory = {};

                dataFactory.validate = function() {
                        return $http.get(urlBase + '/check.php');
                };

                dataFactory.logout = function() {
                        return $http.get(urlBase + '/logout.php');
                };
                dataFactory.startPlay = function() {
                        return $http.get(urlBase + '/start_play.php');
                };

                dataFactory.isPlay = function() {
                        return $http.get(urlBase + '/is_play.php');
                };

                dataFactory.login = function(data) {
                        return $http({
                                'url': urlBase + '/auth.php',
                                'method': 'POST',
                                'headers': {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                'data': $.param({
                                        'cafeName': data.cafeName,
                                        'password': data.password,
                                        'submit': data.submit
                                })
                        });
                };

                return dataFactory;
        };
})();

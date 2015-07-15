(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('userService', userService);
        userService.$inject = ['$http', 'serverUrl'];


        function userService($http, serverUrl) {
                var urlBase = serverUrl + '/game/api/user';
                var dataFactory = {};

                dataFactory.getBalance = function() {
                        return $http.get(urlBase + '/balance');
                };
                
                

                dataFactory.heartbeat = function() {
                        return $http.get(urlBase + '/heartbeat');
                };

                return dataFactory;
        };
})();

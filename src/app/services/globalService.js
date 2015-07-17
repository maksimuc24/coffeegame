(function() {
        'use strict' 

        angular
                .module('coffeeGame')
                .factory('globalService', globalService);


        globalService.$inject = ['$http', 'serverUrl','$q'];


        function globalService($http, serverUrl,$q) {
                var urlBase = serverUrl + '/game/api/user';  
                var Service = {};

                Service.resetData = function() {
                        return $http.get(urlBase + '/reset-balance');
                }; 
                
                Service.buyKgCoffe = function() {
                        return $http.get(urlBase + '/buy-kg-coffe');
                };
                return Service;
        };
})();

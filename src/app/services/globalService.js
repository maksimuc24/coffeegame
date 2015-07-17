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

                Service.updateData = function(opened_months,customers_in_queue,total_coffe_kg,total_drink,balance) {
                        return $http({
                                'url': urlBase + '/update-data',
                                'method': 'POST',
                                'headers': {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                'data': $.param({
                                        'opened_months': opened_months,
                                        'customers_in_queue': customers_in_queue,
                                        'total_coffe_kg':total_coffe_kg,
                                        'total_drink':total_drink,
                                        'balance':balance
                                })
                        });
                };

                return Service;
        };
})();

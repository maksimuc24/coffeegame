(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('gameSettingsService', gameSettingsService);
        gameSettingsService.$inject = ['$http', 'serverUrl'];

        function gameSettingsService($http, serverUrl) {

                var urlBase = serverUrl + '/game/api/settings';
                var dataFactory = {};

                dataFactory.getCoffeeGrinders = function() {
                        return $http.get(urlBase + '/grinders');
                };

                dataFactory.getCoffeeMachines = function() {
                        return $http.get(urlBase + '/machines');
                };

                dataFactory.getCoffeePlaces = function() {
                        return $http.get(urlBase + '/places');
                };

                dataFactory.getCoffeeEmployees = function() {
                        return $http.get(urlBase + '/employees');
                };

                dataFactory.getCoffeeTypes = function() {
                        return $http.get(urlBase + '/coffeeTypes');
                };

                dataFactory.getCoffeePrices = function() {
                        return $http.get(urlBase + '/coffeePrices');
                };

                dataFactory.setUserEquipment = function(equipmentId, equipmentTypeId) {
                        return $http({
                                'url': urlBase + '/setUserEquipment',
                                'method': 'POST',
                                'headers': {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                'data': $.param({
                                        'equipmentId': equipmentId,
                                        'equipmentTypeId': equipmentTypeId
                                })
                        });
                };

                return dataFactory;
        };
})();

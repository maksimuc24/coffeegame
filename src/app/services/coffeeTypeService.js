(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('CoffeeType', CoffeeType);

        CoffeeType.$inject = ['gameSettingsService'];

        function CoffeeType(gameSettingsService) {
                var CoffeeType = function() {
                        this.id = 0;
                        this.name = '';
                        this.pricePerKg = 0;
                };

                CoffeeType.prototype.Set = function(coffeeType) {
                         //save to the database
                        gameSettingsService.setUserEquipment(coffeeType.id,coffeeType.equipment_type_id,parseFloat(coffeeType.price));
                       

                        this.id = coffeeType.id;
                        this.name = coffeeType.name;
                        this.pricePerKg = coffeeType.price;
                };

                CoffeeType.prototype.update = function(callback) {
                        callback();
                };

                return CoffeeType;
        };
})();

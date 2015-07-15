(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('CoffeePrice', CoffeePrice);

        CoffeePrice.$inject = ['gameSettingsService'];
        
        function CoffeePrice(gameSettingsService) {
                var CoffeePrice = function() {
                        this.id = 0;
                        this.price = 0;
                        this.quality = 0;
                };

                CoffeePrice.prototype.Set = function(coffeePrice,status) {
                        //save to the database
                        if(status){
                                gameSettingsService.setUserEquipment(coffeePrice.id,coffeePrice.equipment_type_id,parseFloat(coffeePrice.price));
                        }
                        
                        this.id = coffeePrice.id;
                        this.price = coffeePrice.price;
                        this.quality = coffeePrice.quality;
                };

                CoffeePrice.prototype.update = function(callback) {
                        callback();
                };

                return CoffeePrice;
        }
})();

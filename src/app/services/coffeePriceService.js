(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('CoffeePrice', CoffeePrice);

        CoffeePrice.$inject = [];
        
        function CoffeePrice() {
                var CoffeePrice = function() {
                        this.id = 0;
                        this.price = 0;
                };

                CoffeePrice.prototype.Set = function(coffeePrice) {
                        this.id = coffeePrice.id;
                        this.price = coffeePrice.price;
                };

                CoffeePrice.prototype.update = function(callback) {
                        callback();
                };

                return CoffeePrice;
        }
})();

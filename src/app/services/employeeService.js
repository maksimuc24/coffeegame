(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('Employee', Employee);

        Employee.$inject = ['gameSettingsService'];

        function Employee(gameSettingsService) {
                var Employee = function() {
                        this.id = 0;
                        this.pricePerMonth = 0;
                        this.name = '';
                };

                Employee.prototype.Set = function(employee) {
                        //save to the database
                        gameSettingsService.setUserEquipment(employee.id,employee.equipment_type_id,parseFloat(employee.price));
                    

                        this.id = employee.id;
                        this.pricePerMonth = employee.price;
                        this.name = employee.name;
                };

                Employee.prototype.update = function(callback) {
                        callback();
                };

                return Employee;
        };
})();

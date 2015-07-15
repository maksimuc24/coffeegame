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
                        this.quality = 0;
                };

                Employee.prototype.Set = function(employee,status) {
                        //save to the database
                        if(status){
                                gameSettingsService.setUserEquipment(employee.id,employee.equipment_type_id,parseFloat(employee.price));
                        }
                    

                        this.id = employee.id;
                        this.quality = employee.quality;
                        this.pricePerMonth = employee.price;
                        this.name = employee.name;
                };

                Employee.prototype.update = function(callback) {
                        callback();
                };

                return Employee;
        };
})();

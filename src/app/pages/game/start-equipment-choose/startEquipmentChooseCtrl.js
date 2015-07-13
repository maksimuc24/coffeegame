(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('StartEquipmentChooseCtrl', StartEquipmentChooseCtrl);

        StartEquipmentChooseCtrl.$inject = ['$scope', '$rootScope', 'gameSettingsService', 'growl', '$filter'];

        function StartEquipmentChooseCtrl($scope, $rootScope, gameSettingsService, growl, $filter) {
     
                $scope.tabs = [{
                        name: 'Grinder',
                        active: true
                }, {
                        name: 'Machine',
                        active: false
                }, {
                        name: 'Place',
                        active: false
                }, {
                        name: 'Employees',
                        active: false
                }, {
                        name: 'Coffee',
                        active: false
                }, {
                        name: 'Drink price',
                        active: false
                }];

                $scope.selectedEquipment = {
                        "grinder":null,
                        "machine":null,
                        "place":null,
                        "employee":null,
                        "coffe":null,
                        "drink_price":null
                };


                $scope.model = {};

                getCoffeeGrinders();
                getCoffeeMachines();
                getCoffeePlaces();
                getCoffeeEmployees();
                getCoffeeTypes();
                getCoffeePrices();

                function getCoffeeGrinders() {
                        gameSettingsService.getCoffeeGrinders()
                                .success(function(data) {
                                        $scope.model.coffeeGrinders = data;
                                });
                };

                function getCoffeeMachines() {
                        gameSettingsService.getCoffeeMachines()
                                .success(function(data) {
                                        $scope.model.coffeeMachines = data;
                                });
                };

                function getCoffeePlaces() {
                        gameSettingsService.getCoffeePlaces()
                                .success(function(data) {
                                        $scope.model.coffeePlaces = data;
                                });
                };

                function getCoffeeEmployees() {
                        gameSettingsService.getCoffeeEmployees()
                                .success(function(data) {
                                        $scope.model.coffeeEmployees = data;
                                });
                };

                function getCoffeeTypes() {
                        gameSettingsService.getCoffeeTypes()
                                .success(function(data) {
                                        $scope.model.coffeeTypes = data;
                                });
                };

                function getCoffeePrices() {
                        gameSettingsService.getCoffeePrices()
                                .success(function(data) {
                                        $scope.model.coffeePrices = data;
                                });
                };


                $scope.openAccordion = function(num) {
                        var id = "#accordion-" + num;
                        $(id).click();
                };
                /**
                * Update name to the equipment
                */
                $scope.addSelectedNameToEquipment = function(index,data){  
                       $scope.selectedEquipment[index] = data.id;  
                };

                $scope.chooseCoffeeGinder = function(coffeeGrinder) {
                        if (!$scope.user.canBuyEquipment('grinder', coffeeGrinder)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                        } else {
                                $scope.user.equipment.Add('grinder', coffeeGrinder);
                                $scope.addSelectedNameToEquipment('grinder', coffeeGrinder); 

                                $scope.openAccordion(2);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeMachine = function(coffeeMachine) {
                        if (!$scope.user.canBuyEquipment('machine', coffeeMachine)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                        } else {
                                $scope.user.equipment.Add('machine', coffeeMachine);
                                $scope.addSelectedNameToEquipment('machine', coffeeMachine);
                                $scope.openAccordion(3);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABMACHINE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePlace = function(coffeePlace) {
                        if (!$scope.user.canBuyEquipment('place', coffeePlace)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABPLACE')
                                }));


                        } else {
                                $scope.user.equipment.Add('place', coffeePlace);
                                $scope.addSelectedNameToEquipment('place', coffeePlace);
                                $scope.openAccordion(4);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABPLACE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeEmployee = function(coffeeEmployee) {
                        if (!$scope.user.canBuyEmployee(coffeeEmployee.price)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                        } else {
                                $scope.user.employee.Set(coffeeEmployee); 
                                $scope.addSelectedNameToEquipment('employee', coffeeEmployee);
                                $scope.openAccordion(5);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeType = function(coffeeType) {
                        if (!$scope.user.canBuyCoffeeType(coffeeType.price)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));
                        } else {
                                $scope.user.coffee.type.Set(coffeeType);
                                $scope.addSelectedNameToEquipment('coffe', coffeeType);
                                $scope.openAccordion(6);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePrice = function(coffeePrice) {
                        $scope.user.coffee.price.Set(coffeePrice);
                        growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                name: $filter('translate')('TABPRICE')
                        }));
                        $scope.addSelectedNameToEquipment('drink_price', coffeePrice);
                        $scope.user.update(checkEquipmentFinish);
                };

                function checkEquipmentFinish() {
                        console.log('errorr');
                        growl.success($filter('translate')('THANKS_YOU_FINISHED'));

                        $rootScope.$emit('gameStartEvent');
                };
        };
})();

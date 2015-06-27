(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('StartEquipmentChooseCtrl', StartEquipmentChooseCtrl);

        StartEquipmentChooseCtrl.$inject = ['$scope', '$rootScope', 'gameSettingsService', 'growl'];

        function StartEquipmentChooseCtrl($scope, $rootScope, gameSettingsService, growl) {

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

                $scope.chooseCoffeeGinder = function(coffeeGrinder) {
                        if (!$scope.user.canBuyEquipment('grinder', coffeeGrinder)) {
                                growl.addWarnMessage("It is not enought your balance to choose this grinder.");
                        } else {
                                $scope.user.equipment.Add('grinder', coffeeGrinder);
                                $scope.tabs[1].active = true;

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeMachine = function(coffeeMachine) {
                        if (!$scope.user.canBuyEquipment('machine', coffeeMachine)) {
                                growl.addWarnMessage("It is not enought your balance to choose this machine.");
                        } else {
                                $scope.user.equipment.Add('machine', coffeeMachine);
                                $scope.tabs[2].active = true;

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePlace = function(coffeePlace) {
                        if (!$scope.user.canBuyEquipment('place', coffeePlace)) {
                                growl.addWarnMessage("It is not enought your balance to choose this place.");
                        } else {
                                $scope.user.equipment.Add('place', coffeePlace);
                                $scope.tabs[3].active = true;

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeEmployee = function(coffeeEmployee) {
                        if (!$scope.user.canBuyEmployee(coffeeEmployee.price)) {
                                growl.addWarnMessage("It is not enought your balance to choose this employee.");
                        } else {
                                $scope.user.employee.Set(coffeeEmployee);
                                $scope.tabs[4].active = true;

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeType = function(coffeeType) {
                        if (!$scope.user.canBuyCoffeeType(coffeeType.price)) {
                                growl.addWarnMessage("It is not enought your balance to choose this coffee type.");
                        } else {
                                $scope.user.coffee.type.Set(coffeeType);
                                $scope.tabs[5].active = true;

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePrice = function(coffeePrice) {
                        $scope.user.coffee.price.Set(coffeePrice);

                        $scope.user.update(checkEquipmentFinish);
                };

                function checkEquipmentFinish() {
                        growl.addSuccessMessage("Thank you! You've finished choosing equipment!");

                        $rootScope.$emit('gameStartEvent');
                };
        };
})();

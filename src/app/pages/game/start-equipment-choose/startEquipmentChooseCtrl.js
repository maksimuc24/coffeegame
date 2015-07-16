(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('StartEquipmentChooseCtrl', StartEquipmentChooseCtrl);

        StartEquipmentChooseCtrl.$inject = ['$scope', '$rootScope', 'gameSettingsService', 'growl', '$filter','userService'];

        function StartEquipmentChooseCtrl($scope, $rootScope, gameSettingsService, growl, $filter,userService) {

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
                        "grinder": null,
                        "machine": null,
                        "place": null,
                        "employee": null,
                        "coffe": null,
                        "drink_price": null
                };



                $scope.model = {};

                function checkBalance(){
                        userService.getBalance()
                                .success(function(data) {
                                        $scope.balance = parseFloat(data);
                                        console.log($scope.balance);
                       });
                }
                checkBalance();

                /**
                 * Initialize game equipment
                 * @param {string} type  initializeCofeGame(type)
                 */
                function initializeCofeGame(type) {
                        if (type != "grinder") {
                                getCoffeeGrinders();
                        }
                        if (type != "machine") {
                                getCoffeeMachines();
                        }
                        if (type != "place") {
                                getCoffeePlaces();
                        }
                        if (type != "employee") {
                                getCoffeeEmployees();
                        }
                        if (type != "coffe") {
                                getCoffeeTypes();
                        }
                        if (type != "drink_price") {
                                getCoffeePrices();
                        }
                        getUserEquipment();
                        checkBalance();
                }
                initializeCofeGame('all');

                function getUserEquipment() {
                        gameSettingsService.getUserEquipment()
                                .success(function(data) {  
                                        $scope.selectedEquipment = data;
                                });
                };


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
                $scope.addSelectedNameToEquipment = function(index, data) {
                        $scope.selectedEquipment[index] = data.id;
                };

                $scope.chooseCoffeeGinder = function(coffeeGrinder) {
                        if ($scope.balance<coffeeGrinder.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                        } else {
                                $scope.user.equipment.Add('grinder', coffeeGrinder,true);
                                $scope.addSelectedNameToEquipment('grinder', coffeeGrinder);
                                initializeCofeGame('all');


                                $scope.openAccordion(2);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                                $scope.user.update(checkEquipmentFinish); 
                                 $rootScope.$broadcast('buyEquipment');

                        }
                };

                $scope.chooseCoffeeMachine = function(coffeeMachine) {
                        if ($scope.balance<coffeeMachine.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                        } else {
                                $scope.user.equipment.Add('machine', coffeeMachine,true);
                                $scope.addSelectedNameToEquipment('machine', coffeeMachine);
                                initializeCofeGame('all');

                                $scope.openAccordion(3);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePlace = function(coffeePlace) {
                        if ($scope.balance<coffeePlace.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABPLACE')
                                }));


                        } else {
                                $scope.user.equipment.Add('place', coffeePlace,true);
                                $scope.addSelectedNameToEquipment('place', coffeePlace);
                                initializeCofeGame('all');

                                $scope.openAccordion(4);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABPLACE')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeEmployee = function(coffeeEmployee) {
                        if ($scope.balance<coffeeEmployee.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                        } else {
                                $scope.user.employee.Set(coffeeEmployee,true);
                                $scope.addSelectedNameToEquipment('employee', coffeeEmployee);
                                initializeCofeGame('all');

                                $scope.openAccordion(5);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeType = function(coffeeType) {
                        if ($scope.balance<coffeeType.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));
                        } else {
                                $scope.user.coffee.type.Set(coffeeType,true);
                                $scope.addSelectedNameToEquipment('coffe', coffeeType);
                                initializeCofeGame('all');

                                $scope.openAccordion(6);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                                $rootScope.$broadcast('buyEquipment');
                        }
                };

                $scope.chooseCoffeePrice = function(coffeePrice) {
                        $scope.user.coffee.price.Set(coffeePrice,true);
                        growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                name: $filter('translate')('TABPRICE')
                        }));
                        initializeCofeGame('all');

                        $scope.addSelectedNameToEquipment('drink_price', coffeePrice);
                        $scope.user.update(checkEquipmentFinish);
                        $rootScope.$broadcast('buyEquipment');
                };

                function checkEquipmentFinish() { 
                        growl.success($filter('translate')('THANKS_YOU_FINISHED'));

                        $rootScope.$emit('gameStartEvent');
                        $rootScope.$broadcast('buyEquipment');
                };
        };
})();

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


                $scope.equipment_gifts = {
                    "grinder": null,
                    "machine": null,
                    "place": null,
                    "employee": null,
                    "coffe": null,
                    "drink_price": null
                }


                $scope.model = {};

                function checkBalance(){
                        userService.getBalance()
                                .success(function(data) {
                                        $scope.balance = parseFloat(data); 
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
                $rootScope.$on('reload',function(){
                    initializeCofeGame('all');  
                });

                function getUserEquipment() {
                        gameSettingsService.getUserEquipment()
                                .success(function(data) {  
                                        $scope.selectedEquipment = data; 
                                        //grinder
                                        angular.forEach($scope.model.coffeeGrinders,function(val,d){ 
                                                if(val.id == $scope.selectedEquipment.grinder && val.name !=null){ 
                                                    $scope.equipment_gifts.grinder =  val.gift_image  
                                                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                                                }
                                        });

                                        //machine
                                        angular.forEach($scope.model.coffeeMachines,function(val,d){ 
                                                if(val.id == $scope.selectedEquipment.machine && val.name !=null){ 
                                                    $scope.equipment_gifts.machine =  val.gift_image  
                                                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                                                }
                                        });
                                        //place
                                        angular.forEach($scope.model.coffeePlaces,function(val,d){ 
                                                if(val.id == $scope.selectedEquipment.place && val.name !=null){ 
                                                    $scope.equipment_gifts.place =  val.gift_image  
                                                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                                                }
                                        });
                                        //employees
                                        angular.forEach($scope.model.coffeeEmployees,function(val,d){ 
                                                if(val.id == $scope.selectedEquipment.employee && val.name !=null){ 
                                                    $scope.equipment_gifts.employee =  val.gift_image  
                                                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                                                }
                                        });
                                        //coffe
                                        angular.forEach($scope.model.coffeeTypes,function(val,d){ 
                                                if(val.id == $scope.selectedEquipment.coffe && val.name !=null){ 
                                                    $scope.equipment_gifts.coffe =  val.gift_image  
                                                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                                                }
                                        });
                                        //drink price
                                        angular.forEach($scope.model.coffeePrices,function(val,d){  
                                                if(val.id == $scope.selectedEquipment.drink_price){ 
                                                    $scope.equipment_gifts.drink_price =  val.gift_image  
                                                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                                                }
                                        });

 
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
                        }else {
                                $scope.user.equipment.Add('grinder', coffeeGrinder,true);
                                $scope.addSelectedNameToEquipment('grinder', coffeeGrinder);
                                initializeCofeGame('all');
 
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                                $scope.user.update(checkEquipmentFinish); 
                                $rootScope.$broadcast('buyEquipment'); 
                                     
                                $scope.equipment_gifts.grinder =  coffeeGrinder.gift_image  
                                $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 


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
 
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);

                                $scope.equipment_gifts.machine =  coffeeMachine.gift_image  
                                $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts );  
 
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
 
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABPLACE')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);


                                $scope.equipment_gifts.place =  coffeePlace.gift_image  
                                $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
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
 
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish); 
                                $scope.equipment_gifts.employee =  coffeeEmployee.gift_image  
                                $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
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
 
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                                $rootScope.$broadcast('buyEquipment'); 
                                $scope.equipment_gifts.coffe =  coffeeType.gift_image  
                                $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts );  
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
                        $scope.equipment_gifts.drink_price =  coffeePrice.gift_image  
                        $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts );  
                };

                function checkEquipmentFinish() { 
                         $rootScope.$broadcast('checkEquipmentFinish'); 
                };
        };
})();

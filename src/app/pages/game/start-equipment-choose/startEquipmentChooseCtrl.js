(function() {
    'use strict'


    angular
        .module('coffeeGame')
        .controller('StartEquipmentChooseCtrl', StartEquipmentChooseCtrl);

    StartEquipmentChooseCtrl.$inject = ['$scope', '$rootScope', 'gameSettingsService', 'growl', '$filter', 'userService'];

    function StartEquipmentChooseCtrl($scope, $rootScope, gameSettingsService, growl, $filter, userService) {
        $scope.achievements = {
            "opened_more_than_month": false,
            "opened_more_than_year": false,
            "drinks_served": false,
            "earned_100_000_coins": false,
            "now_grind_coffee_lightning_fast": false,
            "more_people_learn_about_your_cafe": false,
            "a_lot_of_drinks_down_the_drain": false,
            "you_have_moved_your_cafe_3_times": false,
            "full_time_worker_in_your_cafe": false,
            "cafe_becomes_famous_worldwide": false,
            "kgs_of_coffee_in_your_inventory": false
        }
        $scope.num_place = 0;

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


        /**
         * Check all user achievements 
         * @param {type,value}
         * type - achievements type
         * value - achievements value
         */
        function checkAllUserAchievements(type, value) {
            if (type == "opened_more_than_month") {
                var month = parseInt(value / (30 * 24 * 60 * 60 / 1000));
                if (month >= 1) {
                    $scope.achievements.opened_more_than_month = true;
                } else {
                    $scope.achievements.opened_more_than_month = false;
                }

            } else if (type == "opened_more_than_year") {
                if (month >= 12) {
                    $scope.achievements.opened_more_than_year = true;
                } else {
                    $scope.achievements.opened_more_than_year = false;
                }
            } else if (type == "drinks_served") {
                if (value >= 100) {
                    $scope.achievements.drinks_served = true;
                } else {
                    $scope.achievements.drinks_served = false;
                }
            } else if (type == "earned_100_000_coins") {
                if (value >= 100000) {
                    $scope.achievements.earned_100_000_coins = true;
                } else {
                    $scope.achievements.earned_100_000_coins = false;
                }
            } else if (type == "now_grind_coffee_lightning_fast") {
                $scope.achievements.now_grind_coffee_lightning_fast = true;
            } else if (type == "more_people_learn_about_your_cafe") {
                var data = parseInt(value);
                if (data >= 70) {
                    $scope.achievements.more_people_learn_about_your_cafe = true;
                } else {
                    $scope.achievements.more_people_learn_about_your_cafe = false;
                }
            } else if (type == "a_lot_of_drinks_down_the_drain") {
                $scope.achievements.a_lot_of_drinks_down_the_drain = true;
            } else if (type == "you_have_moved_your_cafe_3_times") {
                $scope.achievements.you_have_moved_your_cafe_3_times = true;
            } else if (type == "full_time_worker_in_your_cafe") {
                $scope.achievements.full_time_worker_in_your_cafe = true;
            } else if (type == "cafe_becomes_famous_worldwide") {
                var data = parseInt(value);
                if (data >= 90) {
                    $scope.achievements.cafe_becomes_famous_worldwide = true;
                } else {
                    $scope.achievements.cafe_becomes_famous_worldwide = false;
                }
            } else if (type == "kgs_of_coffee_in_your_inventory") {
                var data = parseInt(value);
                if (data >= 20) {
                    $scope.achievements.kgs_of_coffee_in_your_inventory = true;
                } else {
                    $scope.achievements.kgs_of_coffee_in_your_inventory = false;
                }
            }
        }
        $scope.$on('openedTimeDisplay', function(event, data) {
            checkAllUserAchievements("opened_more_than_month", data.openedTimeDisplay)
            checkAllUserAchievements("opened_more_than_year", data.openedTimeDisplay)
        });
        $scope.$on('drinks_served', function(event, data) {
            checkAllUserAchievements("drinks_served", data)
        });
        $scope.$on('earned_100_000_coins', function(event, data) {
            checkAllUserAchievements("earned_100_000_coins", data)
        });
        $scope.$on('now_grind_coffee_lightning_fast', function(event, data) {
            checkAllUserAchievements("now_grind_coffee_lightning_fast", data)
        });
        $scope.$on('more_people_learn_about_your_cafe', function(event, data) {
            checkAllUserAchievements("more_people_learn_about_your_cafe", data)
        });
        $scope.$on('you_have_moved_your_cafe_3_times', function(event, data) {
            checkAllUserAchievements("you_have_moved_your_cafe_3_times", data)
        });
        $scope.$on('full_time_worker_in_your_cafe', function(event, data) {
            checkAllUserAchievements("full_time_worker_in_your_cafe", data)
        });
        $scope.$on('cafe_becomes_famous_worldwide', function(event, data) {
            checkAllUserAchievements("cafe_becomes_famous_worldwide", data)
        });
        $scope.$on('kgs_of_coffee_in_your_inventory', function(event, data) {
            checkAllUserAchievements("kgs_of_coffee_in_your_inventory", data)
        });
        /*********************End achievements*******************/

        $scope.model = {};

        function checkBalance() {
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
        $rootScope.$on('reload', function() {
            initializeCofeGame('all');
        });

        function getUserEquipment() {
            gameSettingsService.getUserEquipment()
                .success(function(data) {
                    $scope.selectedEquipment = data;
                    //grinder
                    angular.forEach($scope.model.coffeeGrinders, function(val, d) {
                        if (val.id == $scope.selectedEquipment.grinder && val.name != null) {
                            $scope.equipment_gifts.grinder = val.gift_image
                            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                        }
                    });

                    //machine
                    angular.forEach($scope.model.coffeeMachines, function(val, d) {
                        if (val.id == $scope.selectedEquipment.machine && val.name != null) {
                            $scope.equipment_gifts.machine = val.gift_image
                            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                        }
                    });
                    //place
                    angular.forEach($scope.model.coffeePlaces, function(val, d) {
                        if (val.id == $scope.selectedEquipment.place && val.name != null) {
                            $scope.equipment_gifts.place = val.gift_image
                            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                        }
                    });
                    //employees
                    angular.forEach($scope.model.coffeeEmployees, function(val, d) {
                        if (val.id == $scope.selectedEquipment.employee && val.name != null) {
                            $scope.equipment_gifts.employee = val.gift_image
                            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                        }
                    });
                    //coffe
                    angular.forEach($scope.model.coffeeTypes, function(val, d) {
                        if (val.id == $scope.selectedEquipment.coffe && val.name != null) {
                            $scope.equipment_gifts.coffe = val.gift_image
                            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                        }
                    });
                    //drink price
                    angular.forEach($scope.model.coffeePrices, function(val, d) {
                        if (val.id == $scope.selectedEquipment.drink_price) {
                            $scope.equipment_gifts.drink_price = val.gift_image
                            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
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
            if ($scope.balance < coffeeGrinder.price) {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABGRINDER')
                }));
            } else {
                $scope.user.equipment.Add('grinder', coffeeGrinder, true);
                $scope.addSelectedNameToEquipment('grinder', coffeeGrinder);
                initializeCofeGame('all');

                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                    name: $filter('translate')('TABGRINDER')
                }));
                $scope.user.update(checkEquipmentFinish);
                $rootScope.$broadcast('buyEquipment');

                $scope.equipment_gifts.grinder = coffeeGrinder.gift_image
                $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);

                if (coffeeGrinder.id == 17) {
                    $rootScope.$broadcast('now_grind_coffee_lightning_fast', coffeeGrinder.id);
                }

            }
        };


        $scope.chooseCoffeeMachine = function(coffeeMachine) {
            if ($scope.balance < coffeeMachine.price) {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABMACHINE')
                }));
            } else {
                $scope.user.equipment.Add('machine', coffeeMachine, true);
                $scope.addSelectedNameToEquipment('machine', coffeeMachine);
                initializeCofeGame('all');

                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                    name: $filter('translate')('TABMACHINE')
                }));
                $rootScope.$broadcast('buyEquipment');
                $scope.user.update(checkEquipmentFinish);

                $scope.equipment_gifts.machine = coffeeMachine.gift_image
                $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);

            }
        };

        $scope.chooseCoffeePlace = function(coffeePlace) {
            if ($scope.balance < coffeePlace.price) {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABPLACE')
                }));


            } else {
                $scope.user.equipment.Add('place', coffeePlace, true);
                $scope.addSelectedNameToEquipment('place', coffeePlace);
                initializeCofeGame('all');

                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                    name: $filter('translate')('TABPLACE')
                }));
                $rootScope.$broadcast('buyEquipment');
                $scope.user.update(checkEquipmentFinish);


                $scope.equipment_gifts.place = coffeePlace.gift_image
                $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                $scope.num_place += 1
                if ($scope.num_place >= 3) {
                    $rootScope.$broadcast('you_have_moved_your_cafe_3_times', $scope.num_place);

                }
            }
        };

        $scope.chooseCoffeeEmployee = function(coffeeEmployee) {
            if ($scope.balance < coffeeEmployee.price) {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABEMPLOYEES')
                }));
            } else {
                $scope.user.employee.Set(coffeeEmployee, true);
                $scope.addSelectedNameToEquipment('employee', coffeeEmployee);
                initializeCofeGame('all');

                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                    name: $filter('translate')('TABEMPLOYEES')
                }));
                $rootScope.$broadcast('buyEquipment');
                $scope.user.update(checkEquipmentFinish);
                $scope.equipment_gifts.employee = coffeeEmployee.gift_image
                $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
                if (coffeeEmployee.id == 5) {
                    $rootScope.$broadcast('full_time_worker_in_your_cafe', coffeeEmployee);
                }
            }
        };


        $scope.chooseCoffeeType = function(coffeeType) {
            if ($scope.balance < coffeeType.price) {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABCOFFEE')
                }));
            } else {
                $scope.user.coffee.type.Set(coffeeType, true);
                $scope.addSelectedNameToEquipment('coffe', coffeeType);
                initializeCofeGame('all');

                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                    name: $filter('translate')('TABCOFFEE')
                }));

                $scope.user.update(checkEquipmentFinish);
                $rootScope.$broadcast('buyEquipment');
                $scope.equipment_gifts.coffe = coffeeType.gift_image
                $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
            }
        };

        $scope.chooseCoffeePrice = function(coffeePrice) {
            $scope.user.coffee.price.Set(coffeePrice, true);
            growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                name: $filter('translate')('TABPRICE')
            }));
            initializeCofeGame('all');

            $scope.addSelectedNameToEquipment('drink_price', coffeePrice);
            $scope.user.update(checkEquipmentFinish);
            $rootScope.$broadcast('buyEquipment');
            $scope.equipment_gifts.drink_price = coffeePrice.gift_image
            $rootScope.$broadcast('changeEquipment', $scope.equipment_gifts);
        };

        function checkEquipmentFinish() {
            $rootScope.$broadcast('checkEquipmentFinish');
        };
    };
})();

(function() {
    'use strict'


    angular
        .module('coffeeGame')
        .controller('GameCtrl', GameCtrl);

    GameCtrl.$inject = ['$scope', '$rootScope', 'User', 'authenticationService', 'gameSettingsService', 'userService', 'globalService', 'growl', '$filter'];

    function GameCtrl($scope, $rootScope, User, authenticationService, gameSettingsService, userService, globalService, growl, $filter) {
        $scope.game = {};
        $scope.showGame = false;
        $scope.userBalance = 0; 

        $scope.equipment_gifts = {
            "grinder": null,
            "machine": null,
            "place": null,
            "employee": null,
            "coffe": null,
            "drink_price": null
        }

        $scope.$on('changeEquipment', function(event, data) {
            $scope.equipment_gifts = data;
        });

        $scope.userSettigs = {
            "customers_in_queue": 0,
            "total_coffe_kg": 0,
            "total_drink": 0,
            "buy_total_coffe_kg": 0
        };


        $scope.showMainImg = function() {
            var status = false;
            if (angular.isUndefined($scope.user)) {
                var status = true;
            }
            return status;
        }

        $scope.showSelect = function() {
            return !$scope.game.equipmentChooseFinished;
        }

        $scope.showBar = function() {
            return $scope.game.equipmentChooseFinished;
        }


        function sellCoffeAnimation() {
            $('div.plus-one-coffe').addClass("plus-coffe-progress")
            setTimeout(function() {
                $('div.plus-one-coffe').removeClass("plus-coffe-progress")
            }, 400)
        }


        $scope.sellCoffe = function() {

            if ($scope.userSettigs.customers_in_queue <= 0) {
                $scope.userSettigs.buy_total_coffe_kg = $scope.userSettigs.buy_total_coffe_kg - 0.014;
                $scope.userSettigs.total_drink += 1;
                sellCoffeAnimation();
                return;
            }

            var left_kg = $scope.userSettigs.buy_total_coffe_kg - 0.014;

            if (left_kg < 0) {
                growl.warning($filter('translate')('NEED_BUY_KG_COFFE'));
                return;
            }

            var price = parseFloat($scope.user.coffee.price.price);

            $scope.userSettigs.customers_in_queue -= 1;
            $scope.userBalance = parseFloat($scope.userBalance) + price;
            $scope.user.balance = $scope.userBalance;
            $scope.userSettigs.total_drink += 1;


            $scope.userSettigs.buy_total_coffe_kg = $scope.userSettigs.buy_total_coffe_kg - 0.014;
            sellCoffeAnimation()

        };
        //customers in queue 
        $scope.customers_in_queue = function() {
            var drink_quality = $scope.user.coffee.price.quality;
            var random = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
            var success = $scope.successBar;
            var total;

            total = (10 * drink_quality) * random * (success / 100) * Math.abs((1 - success * drink_quality));
            total = total.toFixed();

            if (total >= 0) {
                $scope.userSettigs.customers_in_queue = total;
            }
        };

        $rootScope.$on('openedTimeDisplay', function(e, data) {
            var month = data.openedTimeDisplay;
            var time = data.openedTimeDisplay / (30 * 24 * 60 * 60 / 1000);
            //pay pear month 
            if (parseInt(time) == time && time > 0) {
                var place, employee;
                angular.forEach($scope.user.equipment.items, function(val, key) {
                    if (val.name == "place") {
                        place = val.price;
                    }
                });
                employee = parseFloat($scope.user.employee.pricePerMonth);

                $scope.user.balance = parseFloat($scope.user.balance) - employee - place;
                $scope.userBalance = $scope.user.balance;
            }


            if (data.iterationNum == 2) {
                $scope.customers_in_queue();
            }
            $rootScope.$broadcast('reload');
            globalService.updateData(month, $scope.userSettigs.customers_in_queue, $scope.userSettigs.total_coffe_kg, $scope.userSettigs.total_drink, $scope.userBalance, $scope.userSettigs.buy_total_coffe_kg);

        });


        //get total coffe kg
        $scope.buyCoffee = function() {
            var price = parseFloat($scope.user.coffee.type.pricePerKg);
            var balance = parseFloat($scope.user.balance);
            if (price <= balance) {
                $scope.userSettigs.buy_total_coffe_kg += 1;
                $scope.userBalance = parseFloat($scope.userBalance) - price;
                $scope.user.balance = $scope.userBalance;
                $scope.userSettigs.total_coffe_kg += 1;
                globalService.buyKgCoffe();
            } else {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABCOFFEE')
                }));
            }
        };

        $rootScope.$on('checkEquipmentFinish', function() {
            if (!$scope.game.equipmentChooseFinished) {
                growl.success($filter('translate')('THANKS_YOU_FINISHED'));
            }


            $rootScope.$emit('gameStartEvent');
            $rootScope.$broadcast('buyEquipment');
        });

        $rootScope.$on('gameStartEvent', function() {
            authenticationService.startPlay();
            $scope.game.equipmentChooseFinished = true;
            getSuccesStatus();
        });

        $rootScope.$on('userLogin', function(e, authUser) {
            $scope.user = new User(authUser);
            $scope.user.getBalance();
            ifUserStartPlay();
        });

        $rootScope.$on('buyEquipment', function(e, data) {
            if ($scope.showGame) {
                getSuccesStatus();
            }
        });


        function userBalance() {
            userService.getBalance()
                .success(function(data) {
                    $scope.userBalance = data;
                });
        };

        function getSuccesStatus() {
            if (angular.isUndefined($scope.user)) {
                return;
            }
            var coffePrice = $scope.user.coffee.price.quality;
            var coffeType = $scope.user.coffee.type.quality;
            var employee = $scope.user.employee.quality;
            var place_machine_name = 0;

            angular.forEach($scope.user.equipment.items, function(val, key) {
                place_machine_name = place_machine_name + parseFloat(val.quality);
            });
            $scope.successBar = parseFloat(coffePrice) + parseFloat(coffeType) + parseFloat(employee) + parseFloat(place_machine_name);
            userBalance();
            userGetDetails();

        };


        function userGetDetails() {
            globalService.userGetDetails()
                .success(function(data) {
                    $scope.userSettigs.customers_in_queue = parseInt(data.customers_in_queue);
                    $scope.userSettigs.total_coffe_kg = parseFloat(data.total_coffe_kg);
                    $scope.userSettigs.total_drink = parseInt(data.total_drink);
                    $scope.userSettigs.buy_total_coffe_kg = parseFloat(data.buy_total_coffe_kg);
                    $rootScope.$broadcast('setopenedTime', parseFloat(data.opened_months));
                });
        };

        function setEquipment(type, data) {
            console.log(data)
            if (angular.isUndefined($scope.user)) {
                return;
            }
            switch (type) {
                case "coffeegrinders":
                    $scope.user.equipment.Add('grinder', data, false);
                    $scope.equipment_gifts.grinder =  data.gift_image  
                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                    break;
                case "coffeemachines":
                    $scope.user.equipment.Add('machine', data, false);
                    $scope.equipment_gifts.machine =  data.gift_image  
                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                    break;
                case "coffeeplaces":
                    $scope.user.equipment.Add('place', data, false);
                    $scope.equipment_gifts.place =  data.gift_image 
                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                    break;
                case "coffeetypes":
                    $scope.user.coffee.type.Set(data, false);
                    $scope.equipment_gifts.coffe =  data.gift_image  
                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                    break;
                case "coffeeemployees":
                    $scope.user.employee.Set(data, false);
                    $scope.equipment_gifts.employee =  data.gift_image  
                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                    break;
                case "coffeedrinkprices":
                    $scope.user.coffee.price.Set(data, false);
                    $scope.equipment_gifts.drink_price =  data.gift_image  
                    $rootScope.$broadcast('changeEquipment',$scope.equipment_gifts ); 
                    break;
                default:
                    break;
            }

        };
        //set all user equipment
        $scope.setUserEquipment = function() {
            gameSettingsService.getSavedUserEquipment()
                .success(function(data) {
                    if (data) {
                        angular.forEach(data, function(key) {
                            angular.forEach(key, function(info, table) {
                                setEquipment(table, info);
                            });

                        });

                    }
                    getSuccesStatus();

                });
        };


        //check if user start play some time ago
        function ifUserStartPlay() {
            authenticationService.isPlay()
                .success(function(data) {
                    if (!angular.isUndefined(data.status)) {
                        $scope.game.equipmentChooseFinished = true;
                        $scope.setUserEquipment();
                    }
                });
        };
        ifUserStartPlay();

        //check if need to display game block
        function checkIfShowGame() {
            authenticationService.validate()
                .success(function(data) {
                    if (!angular.isUndefined(data.user_id)) {
                        $scope.showGame = true;
                        return;
                    }
                    $scope.showGame = false;
                });
        };
        checkIfShowGame();

        $scope.$on('userLogout', function() {
            checkIfShowGame();
        });
        $scope.$on('userLogin', function() {
            checkIfShowGame();
        });


        //display modal window with language list
        function checkCookie() {
            setTimeout(function() {
                if (!$scope.showGame) {
                    $('#myModalLanguage').modal();
                }
            }, 2000)

        }
        checkCookie();
    };
})();

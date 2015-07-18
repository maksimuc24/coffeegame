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


        $scope.userSettigs = {
            "customers_in_queue": 0,
            "total_coffe_kg": 0,
            "total_drink": 0,
            "buy_total_coffe_kg":0
        };

        $scope.sellCoffe = function() {
            if($scope.userSettigs.customers_in_queue == 0){
                return;
            }
            
            var left_kg = $scope.userSettigs.total_coffe_kg - 0.014;

            if (left_kg < 0) {
                growl.warning($filter('translate')('NEED_BUY_KG_COFFE'));
                return;
            }

            var price = parseFloat($scope.user.coffee.price.price);
            if ($scope.userSettigs.customers_in_queue >= 2) {
                $scope.userSettigs.customers_in_queue -= 1;
                $scope.user.balance = parseFloat($scope.user.balance) - price;
                $scope.userBalance = $scope.user.balance;
            } else {
                $scope.userSettigs.customers_in_queue = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            }


            $scope.userSettigs.total_drink += 1;
            $scope.user.balance = parseFloat($scope.user.balance) + price;
            $scope.userBalance = $scope.user.balance;

            $scope.userSettigs.total_coffe_kg = $scope.userSettigs.total_coffe_kg - 0.014;

        };
        //customers in queue 
        $scope.customers_in_queue = function() {
            var place_quality = 0;
            var random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
            var success = $scope.successBar;

            angular.forEach($scope.user.equipment.items, function(val, key) {
                if (val.name == "place") {
                    place_quality = val.quality;
                }
            });
            var total;
            total = (10 * place_quality) * random * (success / 100) * (1 - (success / 100) * place_quality);
            total = total.toFixed();

            if (total >= 0) {
                $scope.userSettigs.customers_in_queue = total;
            }
        };

        $rootScope.$on('openedTimeDisplay', function(e, time) {
            $rootScope.$broadcast('reload');
            var month = time;
            time = time / (30 * 24 * 60 * 60 / 1000);
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
            $scope.customers_in_queue();
            globalService.updateData(month, $scope.userSettigs.customers_in_queue, $scope.userSettigs.total_coffe_kg, $scope.userSettigs.total_drink, $scope.userBalance,$scope.userSettigs.buy_total_coffe_kg);
        });


        //get total coffe kg
        $scope.buyCoffee = function() {
            var price = parseFloat($scope.user.coffee.type.pricePerKg);
            var balance = parseFloat($scope.user.balance);
            if (price <= balance) {
                $scope.userSettigs.buy_total_coffe_kg+=1;
                $scope.user.balance = parseFloat($scope.user.balance) - price;
                $scope.userBalance = $scope.user.balance;
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
                    $scope.userSettigs.buy_total_coffe_kg = parseInt(data.buy_total_coffe_kg); 
                    $rootScope.$broadcast('setopenedTime', parseFloat(data.opened_months));
                });
        };

        function setEquipment(type, data) {
            if (angular.isUndefined($scope.user)) {
                return;
            }
            switch (type) {
                case "coffeegrinders":
                    $scope.user.equipment.Add('grinder', data, false);
                    break;
                case "coffeemachines":
                    $scope.user.equipment.Add('machine', data, false);
                    break;
                case "coffeeplaces":
                    $scope.user.equipment.Add('place', data, false);
                    break;
                case "coffeetypes":
                    $scope.user.coffee.type.Set(data, false);
                    break;
                case "coffeeemployees":
                    $scope.user.employee.Set(data, false);
                    break;
                case "coffeedrinkprices":
                    $scope.user.coffee.price.Set(data, false);
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
            console.log($scope.showGam)
            setTimeout(function() {
                console.log('sdasd ',$scope.showGame)
                if (!$scope.showGame) {
                    $('#myModalLanguage').modal();
                }
            }, 2000)

            console.log('sssssss')
        }
        checkCookie();
    };
})();

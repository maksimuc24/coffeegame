(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameCtrl', GameCtrl);

        GameCtrl.$inject = ['$scope', '$rootScope', 'User', 'authenticationService', 'gameSettingsService','userService','globalService'];

        function GameCtrl($scope, $rootScope, User, authenticationService, gameSettingsService,userService,globalService) {
                $scope.game = {};
                $scope.showGame = false;
                $scope.userBalance = 0;


                $scope.userSettigs = {
                      "customers_in_queue":1,
                      "total_coffe_kg":1,
                      "total_drink":1
                };

                //get total coffe kg
                $scope.buyCoffee = function(){ 
                         var price = parseFloat($scope.user.coffee.price.price);
                         var balance = parseFloat($scope.user.balance);
                         if(price <= balance){
                            $scope.user.balance = parseFloat($scope.user.balance) - price;
                            $scope.userBalance = $scope.user.balance; 
                            $scope.userSettigs.total_coffe_kg+=1;
                            globalService.buyKgCoffe(); 
                         }else{
                            growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABCOFFEE')
                            }));
                         }  
                }; 

                $rootScope.$on('gameStartEvent', function() {
                        console.log('GameCtrl gameStartEvent');
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
                        if($scope.showGame){
                                getSuccesStatus();
                        }
                });

                function userBalance(){
                        userService.getBalance()
                                .success(function(data) {
                                        $scope.userBalance = data;
                                });
                }

                function getSuccesStatus(){
                        if(angular.isUndefined($scope.user)){
                                return;
                        } 
                        var coffePrice = $scope.user.coffee.price.quality;
                        var coffeType  = $scope.user.coffee.type.quality;
                        var employee = $scope.user.employee.quality;
                        var place_machine_name = 0;

                        angular.forEach($scope.user.equipment.items,function(val,key){
                               place_machine_name = place_machine_name +parseFloat(val.quality);
                        }); 
                        $scope.successBar = parseFloat(coffePrice)+parseFloat(coffeType)+parseFloat(employee)+parseFloat(place_machine_name);
                         userBalance();
                };


                function setEquipment(type, data) { 
                        if(angular.isUndefined($scope.user)){
                                return;
                        } 
                        switch (type) {
                                case "coffeegrinders":
                                        $scope.user.equipment.Add('grinder', data,false);
                                        break;
                                case "coffeemachines":
                                        $scope.user.equipment.Add('machine', data,false);
                                        break;
                                case "coffeeplaces":
                                        $scope.user.equipment.Add('place', data,false);
                                        break;
                                case "coffeetypes":
                                        $scope.user.coffee.type.Set(data,false);
                                        break;
                                case "coffeeemployees":
                                        $scope.user.employee.Set(data,false);
                                        break;
                                case "coffeedrinkprices":
                                        $scope.user.coffee.price.Set(data,false);
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
                                        console.log('<!---- end equipment --->');
                                        console.log($scope.user);
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
                                                console.log('Login');
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
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameCtrl', GameCtrl);

        GameCtrl.$inject = ['$scope', '$rootScope', 'User', 'authenticationService', 'gameSettingsService'];

        function GameCtrl($scope, $rootScope, User, authenticationService, gameSettingsService) {
                $scope.game = {};
                $scope.showGame = false;

                $rootScope.$on('gameStartEvent', function() {
                        console.log('GameCtrl gameStartEvent');
                        authenticationService.startPlay();
                        $scope.game.equipmentChooseFinished = true;
                });

                $rootScope.$on('userLogin', function(e, authUser) {
                        $scope.user = new User(authUser);
                        $scope.user.getBalance();
                        ifUserStartPlay();
                });



                function setEquipment(type, data) { 
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

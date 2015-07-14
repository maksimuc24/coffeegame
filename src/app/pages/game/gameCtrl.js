(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameCtrl', GameCtrl);

        GameCtrl.$inject = ['$scope', '$rootScope', 'User', 'authenticationService'];

        function GameCtrl($scope, $rootScope, User, authenticationService) {
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


                //check if user start play some time ago
                function ifUserStartPlay(){
                        authenticationService.isPlay()
                        .success(function(data) {
                                 if (!angular.isUndefined(data.status)) {
                                         $scope.game.equipmentChooseFinished = true;
                                 }
                        });
                };
                ifUserStartPlay();
                 

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

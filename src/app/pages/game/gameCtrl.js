(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameCtrl', GameCtrl);

        GameCtrl.$inject = ['$scope', '$rootScope', 'User'];

        function GameCtrl($scope, $rootScope, User) {
                $scope.game = {};

                $rootScope.$on('gameStartEvent', function() {
                        console.log('GameCtrl gameStartEvent');
                        $scope.game.equipmentChooseFinished = true;
                });

                $rootScope.$on('userLogin', function(e, authUser) {
                        $scope.user = new User(authUser);
                        $scope.user.getBalance();
                });
        };
})();

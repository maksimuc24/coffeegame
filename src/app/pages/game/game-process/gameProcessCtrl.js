(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameProcessCtrl', GameProcessCtrl);

        GameProcessCtrl.$inject = ['$scope', '$interval'];

        function GameProcessCtrl($scope, $interval) {
                $scope.model = {
                        openedTime: 0
                };

                var refreshTime = 1000;

                $scope.model.openedTimeDisplay = function() {
                        return $scope.model.openedTime / (30 * 24 * 60 * 60 / 1000);
                };

                $interval(function() {
                        $scope.model.openedTime = $scope.model.openedTime + 1;
                }, refreshTime);
        };
})();

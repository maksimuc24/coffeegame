(function() {
    'use strict'


    angular
        .module('coffeeGame')
        .controller('GameProcessCtrl', GameProcessCtrl);

    GameProcessCtrl.$inject = ['$scope', '$interval', '$rootScope'];

    function GameProcessCtrl($scope, $interval, $rootScope) {
        $scope.model = {
            openedTime: 0
        };
        $scope.iterationNum = 0;

        var refreshTime = 1000;

        $scope.model.openedTimeDisplay = function() {
            return $scope.model.openedTime / (30 * 24 * 60 * 60 / 1000);
        };

        $interval(function() {
            var data = {
                'openedTimeDisplay': $scope.model.openedTime,
                'iterationNum':  $scope.iterationNum
            };
            if ($scope.iterationNum >= 11) {
                $scope.iterationNum = 0;
            }
            
            $rootScope.$broadcast('openedTimeDisplay', data);
            $scope.model.openedTime = $scope.model.openedTime + 1;

            $scope.iterationNum += 1;
        }, refreshTime);

        $rootScope.$on('setopenedTime', function(e, val) {
            $scope.model.openedTime = val;
        });
    };
})();

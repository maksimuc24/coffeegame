(function() {
    'use strict'


    angular
        .module('coffeeGame')
        .controller('globalSettingsCtrl', globalSettingsCtrl);

    globalSettingsCtrl.$inject = ['$scope', '$rootScope', 'User', '$window', 'globalService'];

    function globalSettingsCtrl($scope, $rootScope, User, $window, globalService) {

        String.prototype.toHHMMSS = function() {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

        //reset all information for user
        $scope.globalReset = function() {
            globalService.resetData()
                .success(function(data) {
                    $window.location.reload()
                });
        };
 
            //get top user stats
        $scope.getTopUserStats = function() {
            globalService.getTopStats()
                .success(function(data) {
                    $scope.statsData = data; 
                });
        };
        $scope.getTopUserStats();
        setInterval(function() {
            $scope.getTopUserStats();
        }, 360000)

    };
})();

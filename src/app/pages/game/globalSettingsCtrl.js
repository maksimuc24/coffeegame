(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('globalSettingsCtrl', globalSettingsCtrl);

        globalSettingsCtrl.$inject = ['$scope', '$rootScope', 'User','$window','globalService'];

        function globalSettingsCtrl($scope, $rootScope, User,$window,globalService) { 

                console.log('globalSettingsCtrl');


                //reset all information for user
                $scope.globalReset = function(){ 
                        globalService.resetData()
                                .success(function(data) {
                                        $window.location.reload()
                                }); 
                }
        };
})();

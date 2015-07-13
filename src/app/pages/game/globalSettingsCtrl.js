(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('globalSettingsCtrl', globalSettingsCtrl);

        globalSettingsCtrl.$inject = ['$scope', '$rootScope', 'User'];

        function globalSettingsCtrl($scope, $rootScope, User) { 

                console.log('globalSettingsCtrl');
        };
})();

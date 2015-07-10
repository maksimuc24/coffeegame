(function() {
        'use strict'

        angular
                .module('coffeeGame')
                .controller('TranslateCtrl', TranslateCtrl);

        TranslateCtrl.$inject = ['$scope', '$translate'];

        function TranslateCtrl($scope, $translate) { 

                $scope.changeLanguage = function(langKey) {
                        $translate.uses(langKey);   
                }
 
        };




})();

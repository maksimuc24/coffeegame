(function() {
        'use strict'

        angular
                .module('coffeeGame')
                .controller('TranslateCtrl', TranslateCtrl);

        TranslateCtrl.$inject = ['$scope', '$translate'];

        function TranslateCtrl($scope, $translate) { 
                //display modal window with language list
                $('#myModalLanguage').modal();

                //change lenguage
                $scope.changeLanguage = function(langKey) {
                        $translate.uses(langKey);   
                }
 
        };




})();

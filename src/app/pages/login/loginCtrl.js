(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('LoginCtrl', LoginCtrl);

        LoginCtrl.$inject = ['$scope', 'authenticationService', '$location'];

        function LoginCtrl($scope, authenticationService, $location) {
                $scope.model = {
                        cafeName: '',
                        password: ''
                };

                $scope.login = function() {
                        authenticationService.login({
                                'cafeName': $scope.model.cafeName,
                                'password': $scope.model.password,
                                'submit': 'submit'
                        }).success(function(result) {
                                $location.path('/');
                        });
                }
        };
})();

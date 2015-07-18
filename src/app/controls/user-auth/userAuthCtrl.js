(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('UserAuthCtrl', UserAuthCtrl);

        UserAuthCtrl.$inject = ['$scope', '$rootScope', 'authenticationService','$window'];

        function UserAuthCtrl($scope, $rootScope, authenticationService,$window) {

                $scope.user = {
                        authorized: false
                };

                validateUser();

                $scope.$on('$routeChangeStart', function(next, current) {
                        validateUser();
                });

                $scope.logout = function() {
                        authenticationService.logout();
                        $rootScope.$broadcast('userLogout');
                        $window.location.reload()
                };

                function validateUser() {
                        authenticationService.validate()
                                .success(function(data) {
                                        var user = {
                                                'id': data.user_id,
                                                'cafeName': data.cafeName
                                        };

                                        if (user.id != '' && user.id != undefined) {
                                                $scope.user.authorized = true;
                                                $scope.user.cafeName = user.cafeName;
                                                $rootScope.$broadcast('userLogin', user);
                                        } else {
                                                $scope.user.authorized = false;
                                        }
                                });
                };
        };
})();

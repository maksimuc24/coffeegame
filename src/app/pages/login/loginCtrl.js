(function() {
        'use strict'

   
        angular
        .module('coffeeGame')
        .controller('LoginCtrl', function($scope, authenticationService, $location){
	$scope.model = {
		cafeName: '',
		password: ''
	};

	$scope.login = function(){
		authenticationService.login({
			'cafeName': $scope.model.cafeName,
			'password': $scope.model.password,
			'submit': 'submit'
		}).success(function(result){
			$location.path('/');
		});
	}
});
})();
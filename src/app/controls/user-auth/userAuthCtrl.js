app.controller('UserAuthCtrl', function($scope, $rootScope, authenticationService){

	$scope.user = {
		authorized: false
	};

	validateUser();

	$scope.$on('$routeChangeStart', function(next, current) { 
		validateUser();
 	});	

	$scope.logout = function(){
		authenticationService.logout();
		$rootScope.$broadcast('userLogout');
	};

	function validateUser (){
		authenticationService.validate()
		.success(function(data){
			var user = {
				'id': data.user_id,
				'cafeName': data.cafeName,
				'authorized': false
			};

			if(user.id != '' && user.id != undefined)
			{
				$scope.user.authorized = true;
				$scope.user.cafeName = user.cafeName;
				$rootScope.$broadcast('userLogin', user);
			}else{
				$scope.user.authorized = false;
			}
		});
	};
});
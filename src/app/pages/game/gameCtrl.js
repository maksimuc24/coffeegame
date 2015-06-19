app.controller('GameCtrl', ['$scope', '$rootScope', 'User', function($scope, $rootScope, User){
	$scope.game = { };

	$rootScope.$on('gameStartEvent', function(){
		console.log('GameCtrl gameStartEvent');
		$scope.game.equipmentChooseFinished = true;
	});

	$rootScope.$on('userLogin', function(e, authUser){
		$scope.user = new User(authUser);
		$scope.user.getBalance();
	});
}]);
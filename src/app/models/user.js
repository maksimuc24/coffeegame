app.factory('User', ['userService', function(userService){
	var user = function(authUser){
		this.id = authUser.id;
		this.cafeName = authUser.cafeName;
		this.authorized = authUser.authorized;
	};

	user.prototype.getBalance = function(){
		var balance = userService.getBalance();
	};

	return user;
}]);
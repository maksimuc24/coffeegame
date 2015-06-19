app.factory('authenticationService', ['$http', 'serverUrl', function($http, serverUrl){
	var urlBase = serverUrl + '/authentication';
	var dataFactory = {};

	dataFactory.validate = function(){
		return $http.get(urlBase + '/check.php');
	};

	dataFactory.logout = function(){
		return $http.get(urlBase + '/logout.php');
	};

	dataFactory.login = function(data){
		return $http({
			'url': urlBase + '/auth.php', 
			'method': 'POST',
			'headers': {'Content-Type': 'application/x-www-form-urlencoded'},
			'data': $.param({
				'cafeName': data.cafeName,
				'password': data.password,
				'submit': data.submit
			})
		});
	};
	
	return dataFactory;
}]);
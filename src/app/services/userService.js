app.factory('userService', ['$http', 'serverUrl', function($http, serverUrl){
	var urlBase = serverUrl + '/game/api/user';
	var dataFactory = {};

	dataFactory.getBalance = function(){
		return $http.get(urlBase + '/balance');
	};

	dataFactory.setUserEquipment = function(userEquipmentList){
		return $http({
			'url': urlBase + '/setUserEquipment', 
			'method': 'POST',
			'headers': {'Content-Type': 'application/x-www-form-urlencoded'},
			'data': $.param({
				'userEquipmentList': userEquipmentList
			})
		});
	};

	dataFactory.heartbeat = function(){
		return $http.get(urlBase + '/heartbeat');
	};

	return dataFactory;
}]);

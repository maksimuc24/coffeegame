var app = angular.module('coffeeGame', ['ngRoute', 'ngCookies']);

angular.element(document).ready(function() {
      angular.bootstrap(document, ['coffeeGame']);
});	

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'app/pages/game-start/index.html',
        controller: 'EquipmentChooseCtrl'
      }).
      when('/login', {
        templateUrl: 'app/pages/login/index.html'
      }).
      when('/register', {
        templateUrl: 'app/pages/register/index.html'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);

app.controller('UserAuthCtrl', function($scope, $rootScope, userAuthFactory){

	userAuthFactory.validate()
		.success(function(data){
			var userId = data.userId;
			var userLogin = data.userLogin;

			$scope.user = {
				authorized: userId != '' && userId != undefined,
				login: userLogin
			};
		});

	$scope.logout = function(){
		
	};
});
app.factory('userAuthFactory', ['$http', function($http){
	var urlBase = 'http://localhost:8000/authentication';
	var dataFactory = {};

	dataFactory.validate = function(){
		return $http.get(urlBase + '/check.php');
	};

	return dataFactory;
}]);
app.controller('gameCtrl', ['$rootScope', function($rootScope){
	$rootScope.user = {
		balance: 0,
		equipment: {}
	};
}]);
app.controller('EquipmentChooseCtrl', 
    ['$scope', 'settingsService', '$rootScope',
    function($scope, settingsService, $rootScope) 
    {
        $('#choice-carousel').carousel({
            interval: false
        });

        $scope.model = {};

        getCoffeeGrinders();

        function getCoffeeGrinders(){
            settingsService.getCoffeeGrinders()
            .success(function(data){
                $scope.model.coffeeGrinders = data;
            });
        };

        $scope.chooseCoffeeGinder = function(id){
        	$rootScope.user.equipment.grinder = {
                'id': id
            };
        	$('#choice-carousel').carousel('next');
        };
    }
]);
app.factory('settingsService', ['$http', function($http){
	var urlBase = 'http://localhost:8000/game/api/settings';
	var dataFactory = {};

	dataFactory.getCoffeeGrinders = function(){
		return $http.get(urlBase + '/grinders');
	};

	return dataFactory;
}]);

app.controller('LoginCtrl', function($scope, loginFactory){
	$scope.model = {
		login: '',
		password: ''
	};

	$scope.login = function(){
		loginFactory.login({
			'login': $scope.model.login,
			'password': $scope.model.password
		});
	}
});
app.factory('loginFactory', function($http){
	var urlBase = 'http://localhost:8000/authentication';
	var dataFactory = {};

	dataFactory.login = function(data){
		return $http.post(urlBase + '/auth.php', data);
	};

	return dataFactory;	
});
var app = angular.module('coffeeGame', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angular-growl']);

angular.element(document).ready(function() {
      angular.bootstrap(document, ['coffeeGame']);
});	
  
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'app/pages/game/game.html'
      }).
      when('/login', {
        templateUrl: 'app/pages/login/login.html'
      }).
      when('/register', {
        templateUrl: 'app/pages/register/register.html'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);
app.constant('serverUrl', 'http://coffeegame/server');
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
app.factory('gameSettingsService', ['$http', 'serverUrl', function($http, serverUrl){
	var urlBase = serverUrl + '/game/api/settings';
	var dataFactory = {};

	dataFactory.getCoffeeGrinders = function(){
		return $http.get(urlBase + '/grinders');
	};

	dataFactory.getCoffeeMachines = function(){
		return $http.get(urlBase + '/machines');
	};

	dataFactory.getCoffeePlaces = function(){
		return $http.get(urlBase + '/places');
	};

	dataFactory.getCoffeeEmployees = function(){
		return $http.get(urlBase + '/employees');
	};

	dataFactory.getCoffeeTypes = function(){
		return $http.get(urlBase + '/coffeeTypes');
	};

	dataFactory.getCoffeePrices = function(){
		return $http.get(urlBase + '/coffeePrices');
	};

	return dataFactory;
}]);

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

app.controller('HeartbeatCtrl', function($scope, $rootScope, $timeout, userService){

    var timer;
    
    $rootScope.$on('userLogin', function() { 
		startHeartbeat();
 	});	
    
    $rootScope.$on('userLogout', function() { 
		stopHeartbeat();
 	});	 

	function startHeartbeat(){
        if(!timer){ 
            timer = $timeout(
                function(){
                    userService.heartbeat();
                }, 
            5000);
        }
	};
    
    function stopHeartbeat(){
        if(timer){
            $timeout.cancel(timer);
            timer = undefined;
        }
    };
});
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
app.controller('UserBalanceCtrl', function($scope){
	
});
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
app.controller('LoginCtrl', function($scope, authenticationService, $location){
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
app.controller('GameProcessCtrl', function($scope, $interval){
	$scope.model = {
		openedTime: 0
	};

	var refreshTime = 1000;

	$scope.model.openedTimeDisplay = function(){
		return $scope.model.openedTime / (30*24*60*60/1000);
	};

	$interval(function(){
		$scope.model.openedTime = $scope.model.openedTime + 1;
	}, refreshTime);
});
app.controller('StartEquipmentChooseCtrl', function($scope, $rootScope, gameSettingsService, growl) {

    $scope.tabs = [
        {name: 'Grinder', active: true},
        {name: 'Machine', active: false},
        {name: 'Place', active: false},
        {name: 'Employees', active: false},
        {name: 'Coffee', active: false},
        {name: 'Drink price', active: false}
    ];

    $scope.model = {};

    getCoffeeGrinders();
    getCoffeeMachines();
    getCoffeePlaces();
    getCoffeeEmployees();
    getCoffeeTypes();
    getCoffeePrices();

    function getCoffeeGrinders(){
        gameSettingsService.getCoffeeGrinders()
        .success(function(data){
            $scope.model.coffeeGrinders = data;
        });
    };
    function getCoffeeMachines(){
        gameSettingsService.getCoffeeMachines()
        .success(function(data){
            $scope.model.coffeeMachines = data;
        });
    };
    function getCoffeePlaces(){
        gameSettingsService.getCoffeePlaces()
        .success(function(data){
            $scope.model.coffeePlaces = data;
        });
    };
    function getCoffeeEmployees(){
        gameSettingsService.getCoffeeEmployees()
        .success(function(data){
            $scope.model.coffeeEmployees = data;
        });
    };
    function getCoffeeTypes(){
        gameSettingsService.getCoffeeTypes()
        .success(function(data){
            $scope.model.coffeeTypes = data;
        });
    };
    function getCoffeePrices(){
        gameSettingsService.getCoffeePrices()
        .success(function(data){
            $scope.model.coffeePrices = data;
        });
    };

    $scope.chooseCoffeeGinder = function(coffeeGrinder){
        if(!$scope.user.canBuyEquipment('grinder', coffeeGrinder))
        {
            growl.addWarnMessage("It is not enought your balance to choose this grinder.");
        }
        else
        {
            $scope.user.equipment.Add('grinder', coffeeGrinder);
            $scope.tabs[1].active = true;

            $scope.user.update(checkEquipmentFinish);
        }
    };

    $scope.chooseCoffeeMachine = function(coffeeMachine){
        if(!$scope.user.canBuyEquipment('machine', coffeeMachine))
        {
            growl.addWarnMessage("It is not enought your balance to choose this machine.");
        }
        else
        {
            $scope.user.equipment.Add('machine', coffeeMachine);
            $scope.tabs[2].active = true;

            $scope.user.update(checkEquipmentFinish);
        }
    };

    $scope.chooseCoffeePlace = function(coffeePlace){
        if(!$scope.user.canBuyEquipment('place', coffeePlace))
        {
            growl.addWarnMessage("It is not enought your balance to choose this place.");
        }
        else
        {
            $scope.user.equipment.Add('place', coffeePlace);
            $scope.tabs[3].active = true;
            
            $scope.user.update(checkEquipmentFinish);
        }
    };

    $scope.chooseCoffeeEmployee = function(coffeeEmployee){
        if(!$scope.user.canBuyEmployee(coffeeEmployee.price))
        {
            growl.addWarnMessage("It is not enought your balance to choose this employee.");
        }
        else
        {
            $scope.user.employee.Set(coffeeEmployee);
            $scope.tabs[4].active = true;
            
            $scope.user.update(checkEquipmentFinish);
        }
    };

    $scope.chooseCoffeeType = function(coffeeType){
        if(!$scope.user.canBuyCoffeeType(coffeeType.price))
        {
            growl.addWarnMessage("It is not enought your balance to choose this coffee type.");
        }
        else
        {
            $scope.user.coffee.type.Set(coffeeType);
            $scope.tabs[5].active = true;
            
            $scope.user.update(checkEquipmentFinish);
        }
    };

    $scope.chooseCoffeePrice = function(coffeePrice){
        $scope.user.coffee.price.Set(coffeePrice);
        
        $scope.user.update(checkEquipmentFinish);
    };

    function checkEquipmentFinish (){
        growl.addSuccessMessage("Thank you! You've finished choosing equipment!");

        $rootScope.$emit('gameStartEvent');
    };
});
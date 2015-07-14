(function() {
        'use strict'


        angular
                .module('coffeeGame', ['ngRoute',
                        'ngCookies',
                        'ui.bootstrap',
                        'angular-growl',
                        'pascalprecht.translate',
                        'ngSanitize'
                ]);


        angular
                .element(document)
                .ready(function() {
                        angular.bootstrap(document, ['coffeeGame']);
                });
 
})();

(function() {
        'use strict'


        angular
            .module('coffeeGame')
            .config(['$routeProvider',
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
                }
        ]);
})();

(function() {
        'use strict'

        function getLocation() {
                var url = window.location.href;
                var serverUrl = "http://coffeegame/server";

                if (url.indexOf("http://cafe.jaknakavu.eu/") >= 0) {
                        serverUrl = 'http://cafe.jaknakavu.eu/server';
                }
                return serverUrl;
        } 
        angular 
                .module('coffeeGame')
                .constant('serverUrl', getLocation());

        angular
                .module('coffeeGame')
                .config(['$translateProvider','growlProvider', function($translateProvider,growlProvider) {
                        growlProvider.globalTimeToLive({success: 5000, error: 5000, warning: 5000, info: 5000});
                        
                        // add translation tables
                        $translateProvider.translations('en', translationsEN);
                        $translateProvider.translations('cz', translationsCZ);
                        $translateProvider.translations('ru', translationsRU);
                        $translateProvider.translations('ua', translationsUA);
                        $translateProvider.preferredLanguage('en');
                        $translateProvider.fallbackLanguage('cz');
                        // remember language
                        $translateProvider.useLocalStorage();
                }]);
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('authenticationService', authenticationService)

        authenticationService.$inject = ['$http', 'serverUrl'];

        function authenticationService($http, serverUrl) {
                var urlBase = serverUrl + '/authentication';
                var dataFactory = {};

                dataFactory.validate = function() {
                        return $http.get(urlBase + '/check.php');
                };

                dataFactory.logout = function() {
                        return $http.get(urlBase + '/logout.php');
                };

                dataFactory.login = function(data) {
                        return $http({
                                'url': urlBase + '/auth.php',
                                'method': 'POST',
                                'headers': {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                'data': $.param({
                                        'cafeName': data.cafeName,
                                        'password': data.password,
                                        'submit': data.submit
                                })
                        });
                };

                return dataFactory;
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('CoffeePrice', CoffeePrice);

        CoffeePrice.$inject = ['gameSettingsService'];
        
        function CoffeePrice(gameSettingsService) {
                var CoffeePrice = function() {
                        this.id = 0;
                        this.price = 0;
                };

                CoffeePrice.prototype.Set = function(coffeePrice) {
                        //save to the database
                        gameSettingsService.setUserEquipment(coffeePrice.id,coffeePrice.equipment_type_id,parseFloat(coffeePrice.price));
                        
                        this.id = coffeePrice.id;
                        this.price = coffeePrice.price;
                };

                CoffeePrice.prototype.update = function(callback) {
                        callback();
                };

                return CoffeePrice;
        }
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('CoffeeType', CoffeeType);

        CoffeeType.$inject = ['gameSettingsService'];

        function CoffeeType(gameSettingsService) {
                var CoffeeType = function() {
                        this.id = 0;
                        this.name = '';
                        this.pricePerKg = 0;
                };

                CoffeeType.prototype.Set = function(coffeeType) {
                         //save to the database
                        gameSettingsService.setUserEquipment(coffeeType.id,coffeeType.equipment_type_id,parseFloat(coffeeType.price));
                       

                        this.id = coffeeType.id;
                        this.name = coffeeType.name;
                        this.pricePerKg = coffeeType.price;
                };

                CoffeeType.prototype.update = function(callback) {
                        callback();
                };

                return CoffeeType;
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('Employee', Employee);

        Employee.$inject = ['gameSettingsService'];

        function Employee(gameSettingsService) {
                var Employee = function() {
                        this.id = 0;
                        this.pricePerMonth = 0;
                        this.name = '';
                };

                Employee.prototype.Set = function(employee) {
                        //save to the database
                        gameSettingsService.setUserEquipment(employee.id,employee.equipment_type_id,parseFloat(employee.price));
                    

                        this.id = employee.id;
                        this.pricePerMonth = employee.price;
                        this.name = employee.name;
                };

                Employee.prototype.update = function(callback) {
                        callback();
                };

                return Employee;
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('gameSettingsService', gameSettingsService);
        gameSettingsService.$inject = ['$http', 'serverUrl'];

        function gameSettingsService($http, serverUrl) {

                var urlBase = serverUrl + '/game/api/settings';
                var dataFactory = {};

                dataFactory.getCoffeeGrinders = function() {
                        return $http.get(urlBase + '/grinders');
                };

                dataFactory.getCoffeeMachines = function() {
                        return $http.get(urlBase + '/machines');
                };

                dataFactory.getCoffeePlaces = function() {
                        return $http.get(urlBase + '/places');
                };

                dataFactory.getCoffeeEmployees = function() {
                        return $http.get(urlBase + '/employees');
                };

                dataFactory.getCoffeeTypes = function() {
                        return $http.get(urlBase + '/coffeeTypes');
                };

                dataFactory.getCoffeePrices = function() {
                        return $http.get(urlBase + '/coffeePrices');
                };

                dataFactory.getUserEquipment = function() {
                        return $http.get(urlBase + '/getUserEquipment');
                };

                dataFactory.setUserEquipment = function(equipmentId, equipmentTypeId,equipmentPrice) {
                        return $http({
                                'url': urlBase + '/setUserEquipment',
                                'method': 'POST',
                                'headers': {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                'data': $.param({
                                        'equipmentId': equipmentId,
                                        'equipmentTypeId': equipmentTypeId,
                                        'equipmentPrice':equipmentPrice
                                })
                        });
                };

                return dataFactory;
        };
})();

(function() {
        'use strict' 

        angular
                .module('coffeeGame')
                .factory('globalService', globalService);


        globalService.$inject = ['$http', 'serverUrl','$q'];


        function globalService($http, serverUrl,$q) {
                var urlBase = serverUrl + '/game/api/user';  
                var Service = {};

                Service.resetData = function() {
                        return $http.get(urlBase + '/reset-balance');
                }; 
                return Service;
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('UserEquipment', UserEquipment);

        UserEquipment.$inject = ['gameSettingsService'];

        function UserEquipment(gameSettingsService) {
                var UserEquipment = function() {
                        this.items = [];
                };

                UserEquipment.prototype.Add = function(name, item) {
                        //save to the database
                        gameSettingsService.setUserEquipment(item.id,item.equipment_type_id,parseFloat(item.price));

                        if (this.Exists(name)) {
                                var index = this.IndexOf(name);
                                this.items[index].name = name;
                                this.items[index].id = item.id;
                                this.items[index].price = parseFloat(item.price);
                                this.items[index].item = item.item;
                        } else {
                                this.items.push({
                                        'name': name,
                                        'id': item.id,
                                        'price': parseFloat(item.price),
                                        'item': item
                                });
                        }
                };

                UserEquipment.prototype.Exists = function(name, id) {
                        for (var i = 0; i < this.items.length; i++) {
                                if (this.items[i].name == name && (!id || this.items[i].id == id)) {
                                        return true;
                                }
                        };
                };

                UserEquipment.prototype.IndexOf = function(name, id) {
                        for (var i = 0; i < this.items.length; i++) {
                                if (this.items[i].name == name && (!id || this.items[i].id == id)) {
                                        return i;
                                }
                        };
                };

                UserEquipment.prototype.getItemPrice = function(name) {
                        if (this.Exists(name)) {
                                var index = this.IndexOf(name);
                                return parseFloat(this.items[index].price);
                        } else {
                                return 0;
                        }
                };

                UserEquipment.prototype.TotalAmount = function() {
                        var total = 0;
                        for (var i = 0; i < this.items.length; i++) {
                                total += parseFloat(this.items[i].price);
                        };
                        return total;
                };

                UserEquipment.prototype.update = function(callback) {
                        callback();
                };

                return UserEquipment;
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('userService', userService);
        userService.$inject = ['$http', 'serverUrl'];


        function userService($http, serverUrl) {
                var urlBase = serverUrl + '/game/api/user';
                var dataFactory = {};

                dataFactory.getBalance = function() {
                        return $http.get(urlBase + '/balance');
                };
 

                dataFactory.heartbeat = function() {
                        return $http.get(urlBase + '/heartbeat');
                };

                return dataFactory;
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('User', User);

        User.$inject = ['UserEquipment', 'Employee', 'CoffeeType', 'CoffeePrice', 'userService'];

        function User(UserEquipment, Employee, CoffeeType, CoffeePrice, userService) {
                var User = function(authUser) {
                        this.id = authUser.id;
                        this.cafeName = authUser.cafeName;

                        this.balance = -1;

                        this.displayBalance = function() {
                                return this.balance - this.equipment.TotalAmount();
                        };

                        this.equipment = new UserEquipment();
                        this.employee = new Employee();
                        this.coffee = {
                                type: new CoffeeType(),
                                price: new CoffeePrice()
                        };
                };

                User.prototype.getBalance = function() {
                        var self = this;

                        return userService.getBalance()
                                .success(function(data) {
                                        self.balance = data;
                                });
                };

                User.prototype.isAuthenticated = function() {
                        return this.id != '' && this.id != undefined;
                };

                User.prototype.canBuyEquipment = function(name, item) {
                        var existingItemPrice = this.equipment.getItemPrice(name);
                        var existingEmployeePrice = this.employee.pricePerMonth ? parseFloat(this.employee.pricePerMonth) : 0;
                        var existingCoffeeTypePrice = this.coffee.type.pricePerKg ? parseFloat(this.coffee.type.pricePerKg) : 0;
                        return (this.balance - this.equipment.TotalAmount() + existingItemPrice - existingEmployeePrice - existingCoffeeTypePrice) > item.price;
                };

                User.prototype.canBuyEmployee = function(price) {
                        var existingEmployeePrice = this.employee.pricePerMonth ? parseFloat(this.employee.pricePerMonth) : 0;
                        var existingCoffeeTypePrice = this.coffee.type.pricePerKg ? parseFloat(this.coffee.type.pricePerKg) : 0;
                        return (this.balance - this.equipment.TotalAmount() - existingEmployeePrice - existingCoffeeTypePrice) > price;
                };

                User.prototype.canBuyCoffeeType = function(price) {
                        var existingEmployeePrice = this.employee.pricePerMonth ? parseFloat(this.employee.pricePerMonth) : 0;
                        var existingCoffeeTypePrice = this.coffee.type.pricePerKg ? parseFloat(this.coffee.type.pricePerKg) : 0;
                        return (this.balance - this.equipment.TotalAmount() - existingEmployeePrice - existingCoffeeTypePrice) > price;
                };

                User.prototype.update = function(callback) {
                        if (this.equipment.items.length == 3 && this.employee.id != 0 && this.coffee.type.id != 0 && this.coffee.price.id != 0) {
                                callback();
                        }
                };

                return User;
        }
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameCtrl', GameCtrl);

        GameCtrl.$inject = ['$scope', '$rootScope', 'User'];

        function GameCtrl($scope, $rootScope, User) {
                $scope.game = {};

                $rootScope.$on('gameStartEvent', function() {
                        console.log('GameCtrl gameStartEvent');
                        $scope.game.equipmentChooseFinished = true;
                });

                $rootScope.$on('userLogin', function(e, authUser) {
                        $scope.user = new User(authUser);
                        $scope.user.getBalance();
                });
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('globalSettingsCtrl', globalSettingsCtrl);

        globalSettingsCtrl.$inject = ['$scope', '$rootScope', 'User','$window','globalService'];

        function globalSettingsCtrl($scope, $rootScope, User,$window,globalService) { 

                console.log('globalSettingsCtrl');


                //reset all information for user
                $scope.globalReset = function(){ 
                        globalService.resetData()
                                .success(function(data) {
                                        $window.location.reload()
                                }); 
                }
        };
})();

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

(function() {
        'use strict'

        angular
                .module('coffeeGame')
                .controller('TranslateCtrl', TranslateCtrl);

        TranslateCtrl.$inject = ['$scope', '$translate'];

        function TranslateCtrl($scope, $translate) { 
                //display modal window with language list
                $('#myModalLanguage').modal();

                //change lenguage
                $scope.changeLanguage = function(langKey) {
                        $translate.uses(langKey);   
                }
 
        };




})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('HeartbeatCtrl', HeartbeatCtrl);

        HeartbeatCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'userService'];

        function HeartbeatCtrl($scope, $rootScope, $timeout, userService) {

                var timer;

                $rootScope.$on('userLogin', function() {
                        startHeartbeat();
                });

                $rootScope.$on('userLogout', function() {
                        stopHeartbeat();
                });

                function startHeartbeat() {
                        if (!timer) {
                                timer = $timeout(
                                        function() {
                                                userService.heartbeat();
                                        },
                                        5000);
                        }
                };

                function stopHeartbeat() {
                        if (timer) {
                                $timeout.cancel(timer);
                                timer = undefined;
                        }
                };
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('UserAuthCtrl', UserAuthCtrl);

        UserAuthCtrl.$inject = ['$scope', '$rootScope', 'authenticationService'];

        function UserAuthCtrl($scope, $rootScope, authenticationService) {

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

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('UserBalanceCtrl', UserBalanceCtrl)

        UserBalanceCtrl.$inject = ['$scope'];

        function UserBalanceCtrl($scope) {

        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('GameProcessCtrl', GameProcessCtrl);

        GameProcessCtrl.$inject = ['$scope', '$interval'];

        function GameProcessCtrl($scope, $interval) {
                $scope.model = {
                        openedTime: 0
                };

                var refreshTime = 1000;

                $scope.model.openedTimeDisplay = function() {
                        return $scope.model.openedTime / (30 * 24 * 60 * 60 / 1000);
                };

                $interval(function() {
                        $scope.model.openedTime = $scope.model.openedTime + 1;
                }, refreshTime);
        };
})();

(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .controller('StartEquipmentChooseCtrl', StartEquipmentChooseCtrl);

        StartEquipmentChooseCtrl.$inject = ['$scope', '$rootScope', 'gameSettingsService', 'growl', '$filter'];

        function StartEquipmentChooseCtrl($scope, $rootScope, gameSettingsService, growl, $filter) {

                $scope.tabs = [{
                        name: 'Grinder',
                        active: true
                }, {
                        name: 'Machine',
                        active: false
                }, {
                        name: 'Place',
                        active: false
                }, {
                        name: 'Employees',
                        active: false
                }, {
                        name: 'Coffee',
                        active: false
                }, {
                        name: 'Drink price',
                        active: false
                }];

                $scope.selectedEquipment = {
                        "grinder": null,
                        "machine": null,
                        "place": null,
                        "employee": null,
                        "coffe": null,
                        "drink_price": null
                };



                $scope.model = {};


                /**
                 * Initialize game equipment
                 * @param {string} type  initializeCofeGame(type)
                 */
                function initializeCofeGame(type) {
                        if (type != "grinder") {
                                getCoffeeGrinders();
                        }
                        if (type != "machine") {
                                getCoffeeMachines();
                        }
                        if (type != "place") {
                                getCoffeePlaces();
                        }
                        if (type != "employee") {
                                getCoffeeEmployees();
                        }
                        if (type != "coffe") {
                                getCoffeeTypes();
                        }
                        if (type != "drink_price") {
                                getCoffeePrices();
                        }
                        getUserEquipment();
                }
                initializeCofeGame('all');

                function getUserEquipment() {
                        gameSettingsService.getUserEquipment()
                                .success(function(data) {  
                                        $scope.selectedEquipment = data;
                                });
                };


                function getCoffeeGrinders() {
                        gameSettingsService.getCoffeeGrinders()
                                .success(function(data) {
                                        $scope.model.coffeeGrinders = data;
                                });
                };

                function getCoffeeMachines() {
                        gameSettingsService.getCoffeeMachines()
                                .success(function(data) {
                                        $scope.model.coffeeMachines = data;
                                });
                };

                function getCoffeePlaces() {
                        gameSettingsService.getCoffeePlaces()
                                .success(function(data) {
                                        $scope.model.coffeePlaces = data;
                                });
                };

                function getCoffeeEmployees() {
                        gameSettingsService.getCoffeeEmployees()
                                .success(function(data) {
                                        $scope.model.coffeeEmployees = data;
                                });
                };

                function getCoffeeTypes() {
                        gameSettingsService.getCoffeeTypes()
                                .success(function(data) {
                                        $scope.model.coffeeTypes = data;
                                });
                };

                function getCoffeePrices() {
                        gameSettingsService.getCoffeePrices()
                                .success(function(data) {
                                        $scope.model.coffeePrices = data;
                                });
                };


                $scope.openAccordion = function(num) {
                        var id = "#accordion-" + num;
                        $(id).click();
                };
                /**
                 * Update name to the equipment
                 */
                $scope.addSelectedNameToEquipment = function(index, data) {
                        $scope.selectedEquipment[index] = data.id;
                };

                $scope.chooseCoffeeGinder = function(coffeeGrinder) {
                        if (!$scope.user.canBuyEquipment('grinder', coffeeGrinder)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                        } else {
                                $scope.user.equipment.Add('grinder', coffeeGrinder);
                                $scope.addSelectedNameToEquipment('grinder', coffeeGrinder);
                                initializeCofeGame('all');


                                $scope.openAccordion(2);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeMachine = function(coffeeMachine) {
                        if (!$scope.user.canBuyEquipment('machine', coffeeMachine)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                        } else {
                                $scope.user.equipment.Add('machine', coffeeMachine);
                                $scope.addSelectedNameToEquipment('machine', coffeeMachine);
                                initializeCofeGame('all');

                                $scope.openAccordion(3);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABMACHINE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePlace = function(coffeePlace) {
                        if (!$scope.user.canBuyEquipment('place', coffeePlace)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABPLACE')
                                }));


                        } else {
                                $scope.user.equipment.Add('place', coffeePlace);
                                $scope.addSelectedNameToEquipment('place', coffeePlace);
                                initializeCofeGame('all');

                                $scope.openAccordion(4);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABPLACE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeEmployee = function(coffeeEmployee) {
                        if (!$scope.user.canBuyEmployee(coffeeEmployee.price)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                        } else {
                                $scope.user.employee.Set(coffeeEmployee);
                                $scope.addSelectedNameToEquipment('employee', coffeeEmployee);
                                initializeCofeGame('all');

                                $scope.openAccordion(5);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeType = function(coffeeType) {
                        if (!$scope.user.canBuyCoffeeType(coffeeType.price)) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));
                        } else {
                                $scope.user.coffee.type.Set(coffeeType);
                                $scope.addSelectedNameToEquipment('coffe', coffeeType);
                                initializeCofeGame('all');

                                $scope.openAccordion(6);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePrice = function(coffeePrice) {
                        $scope.user.coffee.price.Set(coffeePrice);
                        growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                name: $filter('translate')('TABPRICE')
                        }));
                        initializeCofeGame('all');

                        $scope.addSelectedNameToEquipment('drink_price', coffeePrice);
                        $scope.user.update(checkEquipmentFinish);
                };

                function checkEquipmentFinish() {
                        console.log('errorr');
                        growl.success($filter('translate')('THANKS_YOU_FINISHED'));

                        $rootScope.$emit('gameStartEvent');
                };
        };
})();

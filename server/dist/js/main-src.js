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

        angular
                .module('coffeeGame')
                .run(function() {
                        FastClick.attach(document.body); 
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

                User.prototype.canBuyEquipment = function(price) { 
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
                dataFactory.startPlay = function() {
                        return $http.get(urlBase + '/start_play.php');
                };

                dataFactory.isPlay = function() {
                        return $http.get(urlBase + '/is_play.php');
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
                        this.quality = 0;
                };

                CoffeePrice.prototype.Set = function(coffeePrice,status) {
                        //save to the database
                        if(status){
                                gameSettingsService.setUserEquipment(coffeePrice.id,coffeePrice.equipment_type_id,parseFloat(coffeePrice.price));
                        }
                        
                        this.id = coffeePrice.id;
                        this.price = coffeePrice.price;
                        this.quality = coffeePrice.quality;
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
                        this.quality = 0;
                };

                CoffeeType.prototype.Set = function(coffeeType,status) {
                         //save to the database
                        if(status){
                           gameSettingsService.setUserEquipment(coffeeType.id,coffeeType.equipment_type_id,parseFloat(coffeeType.price));
                        }

                        this.id = coffeeType.id;
                        this.name = coffeeType.name;
                        this.quality = coffeeType.quality;
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
                        this.quality = 0;
                };

                Employee.prototype.Set = function(employee,status) {
                        //save to the database
                        if(status){
                                gameSettingsService.setUserEquipment(employee.id,employee.equipment_type_id,parseFloat(employee.price));
                        }
                    

                        this.id = employee.id;
                        this.quality = employee.quality;
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

                dataFactory.getSavedUserEquipment = function() {
                        return $http.get(urlBase + '/get-user-equipment');
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
                
                Service.buyKgCoffe = function() {
                        return $http.get(urlBase + '/buy-kg-coffe');
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

                UserEquipment.prototype.Add = function(name, item,status) {
                        //save to the database
                        if(status){
                                 gameSettingsService.setUserEquipment(item.id,item.equipment_type_id,parseFloat(item.price));
                        }

                        if (this.Exists(name)) {
                                var index = this.IndexOf(name);
                                this.items[index].name = name;
                                this.items[index].quality = item.quality;
                                this.items[index].id = item.id;
                                this.items[index].price = parseFloat(item.price);
                                this.items[index].item = item.item;
                        } else {
                                this.items.push({
                                        'name': name,
                                        'quality':item.quality,
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
                .controller('GameCtrl', GameCtrl);

        GameCtrl.$inject = ['$scope', '$rootScope', 'User', 'authenticationService', 'gameSettingsService','userService','globalService'];

        function GameCtrl($scope, $rootScope, User, authenticationService, gameSettingsService,userService,globalService) {
                $scope.game = {};
                $scope.showGame = false;
                $scope.userBalance = 0;


                $scope.userSettigs = {
                      "customers_in_queue":1,
                      "total_coffe_kg":1,
                      "total_drink":1
                };

                //get total coffe kg
                $scope.buyCoffee = function(){ 
                         var price = parseFloat($scope.user.coffee.price.price);
                         var balance = parseFloat($scope.user.balance);
                         if(price <= balance){
                            $scope.user.balance = parseFloat($scope.user.balance) - price;
                            $scope.userBalance = $scope.user.balance; 
                            $scope.userSettigs.total_coffe_kg+=1;
                            globalService.buyKgCoffe(); 
                         }else{
                            growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABCOFFEE')
                            }));
                         }  
                }; 

                $rootScope.$on('gameStartEvent', function() {
                        console.log('GameCtrl gameStartEvent');
                        authenticationService.startPlay();
                        $scope.game.equipmentChooseFinished = true;
                        getSuccesStatus();
                });

                $rootScope.$on('userLogin', function(e, authUser) {
                        $scope.user = new User(authUser);
                        $scope.user.getBalance();
                        ifUserStartPlay();
                });

                $rootScope.$on('buyEquipment', function(e, data) { 
                        if($scope.showGame){
                                getSuccesStatus();
                        }
                });

                function userBalance(){
                        userService.getBalance()
                                .success(function(data) {
                                        $scope.userBalance = data;
                                });
                }

                function getSuccesStatus(){
                        if(angular.isUndefined($scope.user)){
                                return;
                        } 
                        var coffePrice = $scope.user.coffee.price.quality;
                        var coffeType  = $scope.user.coffee.type.quality;
                        var employee = $scope.user.employee.quality;
                        var place_machine_name = 0;

                        angular.forEach($scope.user.equipment.items,function(val,key){
                               place_machine_name = place_machine_name +parseFloat(val.quality);
                        }); 
                        $scope.successBar = parseFloat(coffePrice)+parseFloat(coffeType)+parseFloat(employee)+parseFloat(place_machine_name);
                         userBalance();
                };


                function setEquipment(type, data) { 
                        if(angular.isUndefined($scope.user)){
                                return;
                        } 
                        switch (type) {
                                case "coffeegrinders":
                                        $scope.user.equipment.Add('grinder', data,false);
                                        break;
                                case "coffeemachines":
                                        $scope.user.equipment.Add('machine', data,false);
                                        break;
                                case "coffeeplaces":
                                        $scope.user.equipment.Add('place', data,false);
                                        break;
                                case "coffeetypes":
                                        $scope.user.coffee.type.Set(data,false);
                                        break;
                                case "coffeeemployees":
                                        $scope.user.employee.Set(data,false);
                                        break;
                                case "coffeedrinkprices":
                                        $scope.user.coffee.price.Set(data,false);
                                        break;
                                default:
                                break;
                        }

                };
                //set all user equipment
                $scope.setUserEquipment = function() {
                        gameSettingsService.getSavedUserEquipment()
                                .success(function(data) {
                                        if (data) {
                                                angular.forEach(data, function(key) {
                                                        angular.forEach(key, function(info, table) {
                                                                setEquipment(table, info);
                                                        });

                                                });

                                        }
                                        console.log('<!---- end equipment --->');
                                        console.log($scope.user);
                                        getSuccesStatus();

                                });
                };


                //check if user start play some time ago
                function ifUserStartPlay() {
                        authenticationService.isPlay()
                                .success(function(data) {
                                        if (!angular.isUndefined(data.status)) {
                                                $scope.game.equipmentChooseFinished = true;
                                                $scope.setUserEquipment();
                                        }
                                });
                };
                ifUserStartPlay();

                //check if need to display game block
                function checkIfShowGame() {
                        authenticationService.validate()
                                .success(function(data) {
                                        if (!angular.isUndefined(data.user_id)) {
                                                console.log('Login');
                                                $scope.showGame = true;
                                                return;
                                        }
                                        $scope.showGame = false;
                                });
                };
                checkIfShowGame();

                $scope.$on('userLogout', function() {
                        checkIfShowGame();
                });
                $scope.$on('userLogin', function() {
                        checkIfShowGame();
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

        StartEquipmentChooseCtrl.$inject = ['$scope', '$rootScope', 'gameSettingsService', 'growl', '$filter','userService'];

        function StartEquipmentChooseCtrl($scope, $rootScope, gameSettingsService, growl, $filter,userService) {

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

                function checkBalance(){
                        userService.getBalance()
                                .success(function(data) {
                                        $scope.balance = parseFloat(data);
                                        console.log($scope.balance);
                       });
                }
                checkBalance();

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
                        checkBalance();
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
                        if ($scope.balance<coffeeGrinder.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                        } else {
                                $scope.user.equipment.Add('grinder', coffeeGrinder,true);
                                $scope.addSelectedNameToEquipment('grinder', coffeeGrinder);
                                initializeCofeGame('all');


                                $scope.openAccordion(2);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABGRINDER')
                                }));
                                $scope.user.update(checkEquipmentFinish); 
                                 $rootScope.$broadcast('buyEquipment');

                        }
                };

                $scope.chooseCoffeeMachine = function(coffeeMachine) {
                        if ($scope.balance<coffeeMachine.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                        } else {
                                $scope.user.equipment.Add('machine', coffeeMachine,true);
                                $scope.addSelectedNameToEquipment('machine', coffeeMachine);
                                initializeCofeGame('all');

                                $scope.openAccordion(3);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABMACHINE')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeePlace = function(coffeePlace) {
                        if ($scope.balance<coffeePlace.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABPLACE')
                                }));


                        } else {
                                $scope.user.equipment.Add('place', coffeePlace,true);
                                $scope.addSelectedNameToEquipment('place', coffeePlace);
                                initializeCofeGame('all');

                                $scope.openAccordion(4);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABPLACE')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeEmployee = function(coffeeEmployee) {
                        if ($scope.balance<coffeeEmployee.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                        } else {
                                $scope.user.employee.Set(coffeeEmployee,true);
                                $scope.addSelectedNameToEquipment('employee', coffeeEmployee);
                                initializeCofeGame('all');

                                $scope.openAccordion(5);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABEMPLOYEES')
                                }));
                                $rootScope.$broadcast('buyEquipment');
                                $scope.user.update(checkEquipmentFinish);
                        }
                };

                $scope.chooseCoffeeType = function(coffeeType) {
                        if ($scope.balance<coffeeType.price) {
                                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));
                        } else {
                                $scope.user.coffee.type.Set(coffeeType,true);
                                $scope.addSelectedNameToEquipment('coffe', coffeeType);
                                initializeCofeGame('all');

                                $scope.openAccordion(6);
                                growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                        name: $filter('translate')('TABCOFFEE')
                                }));

                                $scope.user.update(checkEquipmentFinish);
                                $rootScope.$broadcast('buyEquipment');
                        }
                };

                $scope.chooseCoffeePrice = function(coffeePrice) {
                        $scope.user.coffee.price.Set(coffeePrice,true);
                        growl.success($filter('translate')('THANKS_YOU_CHOSEN', {
                                name: $filter('translate')('TABPRICE')
                        }));
                        initializeCofeGame('all');

                        $scope.addSelectedNameToEquipment('drink_price', coffeePrice);
                        $scope.user.update(checkEquipmentFinish);
                        $rootScope.$broadcast('buyEquipment');
                };

                function checkEquipmentFinish() { 
                        growl.success($filter('translate')('THANKS_YOU_FINISHED'));

                        $rootScope.$emit('gameStartEvent');
                        $rootScope.$broadcast('buyEquipment');
                };
        };
})();

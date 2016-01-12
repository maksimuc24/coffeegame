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

!function(){"use strict";angular.module("coffeeGame",["ngRoute","ngCookies","ui.bootstrap","angular-growl","pascalprecht.translate","ngSanitize"]),angular.element(document).ready(function(){angular.bootstrap(document,["coffeeGame"])}),angular.module("coffeeGame").run(function(){FastClick.attach(document.body)})}(),function(){"use strict";angular.module("coffeeGame").config(["$routeProvider",function(e){e.when("/index",{templateUrl:"app/pages/game/game.html"}).when("/login",{templateUrl:"app/pages/login/login.html"}).when("/register",{templateUrl:"app/pages/register/register.html"}).otherwise({redirectTo:"/index"})}])}(),function(){"use strict";function e(){var e=window.location.href,t="http://coffeegame/server";return e.indexOf("http://cafe.jaknakavu.eu/")>=0&&(t="http://cafe.jaknakavu.eu/server"),t}angular.module("coffeeGame").constant("serverUrl",e()),angular.module("coffeeGame").config(["$translateProvider","growlProvider",function(e,t){t.globalTimeToLive({success:5e3,error:5e3,warning:5e3,info:5e3}),e.translations("en",translationsEN),e.translations("cz",translationsCZ),e.translations("ru",translationsRU),e.translations("ua",translationsUA),e.preferredLanguage("en"),e.fallbackLanguage("cz"),e.useLocalStorage()}])}(),function(){"use strict";function e(e,t,n,a,i){var o=function(i){this.id=i.id,this.cafeName=i.cafeName,this.balance=-1,this.displayBalance=function(){return this.balance-this.equipment.TotalAmount()},this.equipment=new e,this.employee=new t,this.coffee={type:new n,price:new a}};return o.prototype.getBalance=function(){var e=this;return i.getBalance().success(function(t){e.balance=t})},o.prototype.isAuthenticated=function(){return""!=this.id&&void 0!=this.id},o.prototype.canBuyEquipment=function(e){var t=this.equipment.getItemPrice(name),n=this.employee.pricePerMonth?parseFloat(this.employee.pricePerMonth):0,a=this.coffee.type.pricePerKg?parseFloat(this.coffee.type.pricePerKg):0;return this.balance-this.equipment.TotalAmount()+t-n-a>item.price},o.prototype.canBuyEmployee=function(e){var t=this.employee.pricePerMonth?parseFloat(this.employee.pricePerMonth):0,n=this.coffee.type.pricePerKg?parseFloat(this.coffee.type.pricePerKg):0;return this.balance-this.equipment.TotalAmount()-t-n>e},o.prototype.canBuyCoffeeType=function(e){var t=this.employee.pricePerMonth?parseFloat(this.employee.pricePerMonth):0,n=this.coffee.type.pricePerKg?parseFloat(this.coffee.type.pricePerKg):0;return this.balance-this.equipment.TotalAmount()-t-n>e},o.prototype.update=function(e){3==this.equipment.items.length&&0!=this.employee.id&&0!=this.coffee.type.id&&0!=this.coffee.price.id&&e()},o}angular.module("coffeeGame").factory("User",e),e.$inject=["UserEquipment","Employee","CoffeeType","CoffeePrice","userService"]}(),function(){"use strict";function e(e,t){var n=t+"/authentication",a={};return a.validate=function(){return e.get(n+"/check.php")},a.logout=function(){return e.get(n+"/logout.php")},a.startPlay=function(){return e.get(n+"/start_play.php")},a.isPlay=function(){return e.get(n+"/is_play.php")},a.login=function(t){return e({url:n+"/auth.php",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:$.param({cafeName:t.cafeName,password:t.password,submit:t.submit})})},a}angular.module("coffeeGame").factory("authenticationService",e),e.$inject=["$http","serverUrl"]}(),function(){"use strict";function e(e){var t=function(){this.id=0,this.price=0,this.quality=0};return t.prototype.Set=function(t,n){n&&e.setUserEquipment(t.id,t.equipment_type_id,parseFloat(t.price)),this.id=t.id,this.price=t.price,this.quality=t.quality},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("CoffeePrice",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e){var t=function(){this.id=0,this.name="",this.pricePerKg=0,this.quality=0};return t.prototype.Set=function(t,n){n&&e.setUserEquipment(t.id,t.equipment_type_id,parseFloat(t.price)),this.id=t.id,this.name=t.name,this.quality=t.quality,this.pricePerKg=t.price},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("CoffeeType",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e){var t=function(){this.id=0,this.pricePerMonth=0,this.name="",this.quality=0};return t.prototype.Set=function(t,n){n&&e.setUserEquipment(t.id,t.equipment_type_id,parseFloat(t.price)),this.id=t.id,this.quality=t.quality,this.pricePerMonth=t.price,this.name=t.name},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("Employee",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e,t){var n=t+"/game/api/settings",a={};return a.getCoffeeGrinders=function(){return e.get(n+"/grinders")},a.getSavedUserEquipment=function(){return e.get(n+"/get-user-equipment")},a.getCoffeeMachines=function(){return e.get(n+"/machines")},a.getCoffeePlaces=function(){return e.get(n+"/places")},a.getCoffeeEmployees=function(){return e.get(n+"/employees")},a.getCoffeeTypes=function(){return e.get(n+"/coffeeTypes")},a.getCoffeePrices=function(){return e.get(n+"/coffeePrices")},a.getUserEquipment=function(){return e.get(n+"/getUserEquipment")},a.setUserEquipment=function(t,a,i){return e({url:n+"/setUserEquipment",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:$.param({equipmentId:t,equipmentTypeId:a,equipmentPrice:i})})},a}angular.module("coffeeGame").factory("gameSettingsService",e),e.$inject=["$http","serverUrl"]}(),function(){"use strict";function e(e,t,n){var a=t+"/game/api/user",i={};return i.resetData=function(){return e.get(a+"/reset-balance")},i.userGetDetails=function(){return e.get(a+"/get-details")},i.buyKgCoffe=function(){return e.get(a+"/buy-kg-coffe")},i.updateData=function(t,n,i,o,r,s){return e({url:a+"/update-data",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:$.param({opened_months:t,customers_in_queue:n,total_coffe_kg:i,total_drink:o,balance:r,buy_total_coffe_kg:s})})},i}angular.module("coffeeGame").factory("globalService",e),e.$inject=["$http","serverUrl","$q"]}(),function(){"use strict";function e(e){var t=function(){this.items=[]};return t.prototype.Add=function(t,n,a){if(a&&e.setUserEquipment(n.id,n.equipment_type_id,parseFloat(n.price)),this.Exists(t)){var i=this.IndexOf(t);this.items[i].name=t,this.items[i].quality=n.quality,this.items[i].id=n.id,this.items[i].price=parseFloat(n.price),this.items[i].item=n.item}else this.items.push({name:t,quality:n.quality,id:n.id,price:parseFloat(n.price),item:n})},t.prototype.Exists=function(e,t){for(var n=0;n<this.items.length;n++)if(this.items[n].name==e&&(!t||this.items[n].id==t))return!0},t.prototype.IndexOf=function(e,t){for(var n=0;n<this.items.length;n++)if(this.items[n].name==e&&(!t||this.items[n].id==t))return n},t.prototype.getItemPrice=function(e){if(this.Exists(e)){var t=this.IndexOf(e);return parseFloat(this.items[t].price)}return 0},t.prototype.TotalAmount=function(){for(var e=0,t=0;t<this.items.length;t++)e+=parseFloat(this.items[t].price);return e},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("UserEquipment",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e,t){var n=t+"/game/api/user",a={};return a.getBalance=function(){return e.get(n+"/balance")},a.heartbeat=function(){return e.get(n+"/heartbeat")},a}angular.module("coffeeGame").factory("userService",e),e.$inject=["$http","serverUrl"]}(),function(){"use strict";function e(e,t,n,a){function i(){r||(r=n(function(){a.heartbeat()},5e3))}function o(){r&&(n.cancel(r),r=void 0)}var r;t.$on("userLogin",function(){i()}),t.$on("userLogout",function(){o()})}angular.module("coffeeGame").controller("HeartbeatCtrl",e),e.$inject=["$scope","$rootScope","$timeout","userService"]}(),function(){"use strict";function e(e,t,n,a){function i(){n.validate().success(function(n){var a={id:n.user_id,cafeName:n.cafeName};""!=a.id&&void 0!=a.id?(e.user.authorized=!0,e.user.cafeName=a.cafeName,t.$broadcast("userLogin",a)):e.user.authorized=!1})}e.user={authorized:!1},i(),e.$on("$routeChangeStart",function(e,t){i()}),e.logout=function(){n.logout(),t.$broadcast("userLogout"),a.location.reload()}}angular.module("coffeeGame").controller("UserAuthCtrl",e),e.$inject=["$scope","$rootScope","authenticationService","$window"]}(),function(){"use strict";function e(e){}angular.module("coffeeGame").controller("UserBalanceCtrl",e),e.$inject=["$scope"]}(),function(){"use strict";function e(e,t,n,a,i,o,r,s,c){function u(){o.getBalance().success(function(t){e.userBalance=t})}function f(){if(!angular.isUndefined(e.user)){var t=e.user.coffee.price.quality,n=e.user.coffee.type.quality,a=e.user.employee.quality,i=0;angular.forEach(e.user.equipment.items,function(e,t){i+=parseFloat(e.quality)}),e.successBar=parseFloat(t)+parseFloat(n)+parseFloat(a)+parseFloat(i),u(),l()}}function l(){r.userGetDetails().success(function(n){e.userSettigs.customers_in_queue=parseInt(n.customers_in_queue),e.userSettigs.total_coffe_kg=parseFloat(n.total_coffe_kg),e.userSettigs.total_drink=parseInt(n.total_drink),e.userSettigs.buy_total_coffe_kg=parseFloat(n.buy_total_coffe_kg),t.$broadcast("setopenedTime",parseFloat(n.opened_months))})}function p(t,n){if(!angular.isUndefined(e.user))switch(t){case"coffeegrinders":e.user.equipment.Add("grinder",n,!1);break;case"coffeemachines":e.user.equipment.Add("machine",n,!1);break;case"coffeeplaces":e.user.equipment.Add("place",n,!1);break;case"coffeetypes":e.user.coffee.type.Set(n,!1);break;case"coffeeemployees":e.user.employee.Set(n,!1);break;case"coffeedrinkprices":e.user.coffee.price.Set(n,!1)}}function m(){a.isPlay().success(function(t){angular.isUndefined(t.status)||(e.game.equipmentChooseFinished=!0,e.setUserEquipment())})}function d(){a.validate().success(function(t){return angular.isUndefined(t.user_id)?void(e.showGame=!1):void(e.showGame=!0)})}function g(){setTimeout(function(){e.showGame||$("#myModalLanguage").modal()},2e3)}e.game={},e.showGame=!1,e.userBalance=0,e.userSettigs={customers_in_queue:0,total_coffe_kg:0,total_drink:0,buy_total_coffe_kg:0},e.showMainImg=function(){var t=!1;if(angular.isUndefined(e.user))var t=!0;return t},e.showSelect=function(){return!e.game.equipmentChooseFinished},e.showBar=function(){return e.game.equipmentChooseFinished},e.sellCoffe=function(){if($(".plus-one-coffe").addClass("plus-coffe-progress"),e.userSettigs.customers_in_queue<=0)return e.userSettigs.buy_total_coffe_kg=e.userSettigs.buy_total_coffe_kg-.014,void(e.userSettigs.total_drink+=1);var t=e.userSettigs.buy_total_coffe_kg-.014;if(0>t)return void s.warning(c("translate")("NEED_BUY_KG_COFFE"));var n=parseFloat(e.user.coffee.price.price);e.userSettigs.customers_in_queue-=1,e.userBalance=parseFloat(e.userBalance)+n,e.user.balance=e.userBalance,e.userSettigs.total_drink+=1,e.userSettigs.buy_total_coffe_kg=e.userSettigs.buy_total_coffe_kg-.014},e.customers_in_queue=function(){var t,n=e.user.coffee.price.quality,a=Math.floor(500*Math.random())+1,i=e.successBar;t=10*n*a*(i/100)*Math.abs(1-i*n),t=t.toFixed(),t>=0&&(e.userSettigs.customers_in_queue=t)},t.$on("openedTimeDisplay",function(n,a){var i=a.openedTimeDisplay,o=a.openedTimeDisplay/2592;if(parseInt(o)==o&&o>0){var s,c;angular.forEach(e.user.equipment.items,function(e,t){"place"==e.name&&(s=e.price)}),c=parseFloat(e.user.employee.pricePerMonth),e.user.balance=parseFloat(e.user.balance)-c-s,e.userBalance=e.user.balance}2==a.iterationNum&&e.customers_in_queue(),t.$broadcast("reload"),r.updateData(i,e.userSettigs.customers_in_queue,e.userSettigs.total_coffe_kg,e.userSettigs.total_drink,e.userBalance,e.userSettigs.buy_total_coffe_kg)}),e.buyCoffee=function(){var t=parseFloat(e.user.coffee.type.pricePerKg),n=parseFloat(e.user.balance);n>=t?(e.userSettigs.buy_total_coffe_kg+=1,e.userBalance=parseFloat(e.userBalance)-t,e.user.balance=e.userBalance,e.userSettigs.total_coffe_kg+=1,r.buyKgCoffe()):s.warning(c("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:c("translate")("TABCOFFEE")}))},t.$on("checkEquipmentFinish",function(){e.game.equipmentChooseFinished||s.success(c("translate")("THANKS_YOU_FINISHED")),t.$emit("gameStartEvent"),t.$broadcast("buyEquipment")}),t.$on("gameStartEvent",function(){a.startPlay(),e.game.equipmentChooseFinished=!0,f()}),t.$on("userLogin",function(t,a){e.user=new n(a),e.user.getBalance(),m()}),t.$on("buyEquipment",function(t,n){e.showGame&&f()}),e.setUserEquipment=function(){i.getSavedUserEquipment().success(function(e){e&&angular.forEach(e,function(e){angular.forEach(e,function(e,t){p(t,e)})}),f()})},m(),d(),e.$on("userLogout",function(){d()}),e.$on("userLogin",function(){d()}),g()}angular.module("coffeeGame").controller("GameCtrl",e),e.$inject=["$scope","$rootScope","User","authenticationService","gameSettingsService","userService","globalService","growl","$filter"]}(),function(){"use strict";function e(e,t,n,a,i){e.globalReset=function(){i.resetData().success(function(e){a.location.reload()})}}angular.module("coffeeGame").controller("globalSettingsCtrl",e),e.$inject=["$scope","$rootScope","User","$window","globalService"]}(),function(){"use strict";function e(e,t,n){e.model={cafeName:"",password:""},e.login=function(){t.login({cafeName:e.model.cafeName,password:e.model.password,submit:"submit"}).success(function(e){n.path("/")})}}angular.module("coffeeGame").controller("LoginCtrl",e),e.$inject=["$scope","authenticationService","$location"]}(),function(){"use strict";function e(e,t){e.changeLanguage=function(e){t.uses(e)}}angular.module("coffeeGame").controller("TranslateCtrl",e),e.$inject=["$scope","$translate"]}(),function(){"use strict";function e(e,t,n){e.model={openedTime:0},e.iterationNum=0;var a=1e3;e.model.openedTimeDisplay=function(){return e.model.openedTime/2592},t(function(){var t={openedTimeDisplay:e.model.openedTime,iterationNum:e.iterationNum};e.iterationNum>=11&&(e.iterationNum=0),n.$broadcast("openedTimeDisplay",t),e.model.openedTime=e.model.openedTime+1,e.iterationNum+=1},a),n.$on("setopenedTime",function(t,n){e.model.openedTime=n})}angular.module("coffeeGame").controller("GameProcessCtrl",e),e.$inject=["$scope","$interval","$rootScope"]}(),function(){"use strict";function e(e,t,n,a,i,o){function r(){o.getBalance().success(function(t){e.balance=parseFloat(t)})}function s(e){"grinder"!=e&&u(),"machine"!=e&&f(),"place"!=e&&l(),"employee"!=e&&p(),"coffe"!=e&&m(),"drink_price"!=e&&d(),c(),r()}function c(){n.getUserEquipment().success(function(t){e.selectedEquipment=t})}function u(){n.getCoffeeGrinders().success(function(t){e.model.coffeeGrinders=t})}function f(){n.getCoffeeMachines().success(function(t){e.model.coffeeMachines=t})}function l(){n.getCoffeePlaces().success(function(t){e.model.coffeePlaces=t})}function p(){n.getCoffeeEmployees().success(function(t){e.model.coffeeEmployees=t})}function m(){n.getCoffeeTypes().success(function(t){e.model.coffeeTypes=t})}function d(){n.getCoffeePrices().success(function(t){e.model.coffeePrices=t})}function g(){t.$broadcast("checkEquipmentFinish")}e.tabs=[{name:"Grinder",active:!0},{name:"Machine",active:!1},{name:"Place",active:!1},{name:"Employees",active:!1},{name:"Coffee",active:!1},{name:"Drink price",active:!1}],e.selectedEquipment={grinder:null,machine:null,place:null,employee:null,coffe:null,drink_price:null},e.model={},r(),s("all"),t.$on("reload",function(){s("all")}),e.openAccordion=function(e){var t="#accordion-"+e;$(t).click()},e.addSelectedNameToEquipment=function(t,n){e.selectedEquipment[t]=n.id},e.chooseCoffeeGinder=function(n){e.balance<n.price?a.warning(i("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:i("translate")("TABGRINDER")})):(e.user.equipment.Add("grinder",n,!0),e.addSelectedNameToEquipment("grinder",n),s("all"),e.openAccordion(2),a.success(i("translate")("THANKS_YOU_CHOSEN",{name:i("translate")("TABGRINDER")})),e.user.update(g),t.$broadcast("buyEquipment"))},e.chooseCoffeeMachine=function(n){e.balance<n.price?a.warning(i("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:i("translate")("TABMACHINE")})):(e.user.equipment.Add("machine",n,!0),e.addSelectedNameToEquipment("machine",n),s("all"),e.openAccordion(3),a.success(i("translate")("THANKS_YOU_CHOSEN",{name:i("translate")("TABMACHINE")})),t.$broadcast("buyEquipment"),e.user.update(g))},e.chooseCoffeePlace=function(n){e.balance<n.price?a.warning(i("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:i("translate")("TABPLACE")})):(e.user.equipment.Add("place",n,!0),e.addSelectedNameToEquipment("place",n),s("all"),e.openAccordion(4),a.success(i("translate")("THANKS_YOU_CHOSEN",{name:i("translate")("TABPLACE")})),t.$broadcast("buyEquipment"),e.user.update(g))},e.chooseCoffeeEmployee=function(n){e.balance<n.price?a.warning(i("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:i("translate")("TABEMPLOYEES")})):(e.user.employee.Set(n,!0),e.addSelectedNameToEquipment("employee",n),s("all"),e.openAccordion(5),a.success(i("translate")("THANKS_YOU_CHOSEN",{name:i("translate")("TABEMPLOYEES")})),t.$broadcast("buyEquipment"),e.user.update(g))},e.chooseCoffeeType=function(n){e.balance<n.price?a.warning(i("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:i("translate")("TABCOFFEE")})):(e.user.coffee.type.Set(n,!0),e.addSelectedNameToEquipment("coffe",n),s("all"),e.openAccordion(6),a.success(i("translate")("THANKS_YOU_CHOSEN",{name:i("translate")("TABCOFFEE")})),e.user.update(g),t.$broadcast("buyEquipment"))},e.chooseCoffeePrice=function(n){e.user.coffee.price.Set(n,!0),a.success(i("translate")("THANKS_YOU_CHOSEN",{name:i("translate")("TABPRICE")})),s("all"),e.addSelectedNameToEquipment("drink_price",n),e.user.update(g),t.$broadcast("buyEquipment")}}angular.module("coffeeGame").controller("StartEquipmentChooseCtrl",e),e.$inject=["$scope","$rootScope","gameSettingsService","growl","$filter","userService"]}();
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

                Service.userGetDetails = function() {
                        return $http.get(urlBase + '/get-details');
                }; 

                Service.buyKgCoffe = function() {
                        return $http.get(urlBase + '/buy-kg-coffe');
                };

                Service.getTopStats = function() {
                        return $http.get(urlBase + '/get-top-stats');
                };

                Service.updateData = function(opened_months,customers_in_queue,total_coffe_kg,total_drink,balance,buy_total_coffe_kg) {
                        return $http({
                                'url': urlBase + '/update-data',
                                'method': 'POST',
                                'headers': {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                'data': $.param({
                                        'opened_months': opened_months,
                                        'customers_in_queue': customers_in_queue,
                                        'total_coffe_kg':total_coffe_kg,
                                        'total_drink':total_drink,
                                        'balance':balance,
                                        "buy_total_coffe_kg":buy_total_coffe_kg
                                })
                        });
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
                .controller('UserAuthCtrl', UserAuthCtrl);

        UserAuthCtrl.$inject = ['$scope', '$rootScope', 'authenticationService','$window'];

        function UserAuthCtrl($scope, $rootScope, authenticationService,$window) {

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
                        $window.location.reload()
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

    GameCtrl.$inject = ['$scope', '$rootScope', 'User', 'authenticationService', 'gameSettingsService', 'userService', 'globalService', 'growl', '$filter'];

    function GameCtrl($scope, $rootScope, User, authenticationService, gameSettingsService, userService, globalService, growl, $filter) {
        $scope.game = {};
        $scope.showGame = false;
        $scope.userBalance = 0;



        $scope.userSettigs = {
            "customers_in_queue": 0,
            "total_coffe_kg": 0,
            "total_drink": 0,
            "buy_total_coffe_kg": 0
        };


        $scope.showMainImg = function(){ 
             var status = false;
             if(angular.isUndefined($scope.user)){
                 var status = true; 
             } 
             return status; 
        }

        $scope.showSelect = function(){ 
             return !$scope.game.equipmentChooseFinished;
        }

        $scope.showBar = function(){ 
             return $scope.game.equipmentChooseFinished;
        }


        function sellCoffeAnimation(){ 
            $('div.plus-one-coffe').addClass("plus-coffe-progress")
            setTimeout(function(){
                $('div.plus-one-coffe').removeClass("plus-coffe-progress")
            }, 400) 
        }


        $scope.sellCoffe = function() {
             
            if ($scope.userSettigs.customers_in_queue <= 0) {
                $scope.userSettigs.buy_total_coffe_kg = $scope.userSettigs.buy_total_coffe_kg - 0.014;
                $scope.userSettigs.total_drink += 1;
                sellCoffeAnimation();
                return;
            }

            var left_kg = $scope.userSettigs.buy_total_coffe_kg - 0.014;

            if (left_kg < 0) {
                growl.warning($filter('translate')('NEED_BUY_KG_COFFE'));
                return;
            }

            var price = parseFloat($scope.user.coffee.price.price);
           
            $scope.userSettigs.customers_in_queue -= 1;  
            $scope.userBalance = parseFloat($scope.userBalance)+price;
            $scope.user.balance = $scope.userBalance; 
            $scope.userSettigs.total_drink += 1;


            $scope.userSettigs.buy_total_coffe_kg = $scope.userSettigs.buy_total_coffe_kg - 0.014; 
            sellCoffeAnimation()

        };
        //customers in queue 
        $scope.customers_in_queue = function() {
            var drink_quality = $scope.user.coffee.price.quality;
            var random = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
            var success = $scope.successBar;
            var total;

            total = (10 * drink_quality) * random * (success / 100) * Math.abs((1 - success * drink_quality));
            total = total.toFixed();

            if (total >= 0) {
                $scope.userSettigs.customers_in_queue = total;
            }
        };

        $rootScope.$on('openedTimeDisplay', function(e, data) {
            var month = data.openedTimeDisplay;
            var time = data.openedTimeDisplay / (30 * 24 * 60 * 60 / 1000);
            //pay pear month 
            if (parseInt(time) == time && time > 0) {
                var place, employee;
                angular.forEach($scope.user.equipment.items, function(val, key) {
                    if (val.name == "place") {
                        place = val.price;
                    }
                });
                employee = parseFloat($scope.user.employee.pricePerMonth);

                $scope.user.balance = parseFloat($scope.user.balance) - employee - place;
                $scope.userBalance = $scope.user.balance;
            }


            if (data.iterationNum == 2) {
                  $scope.customers_in_queue();
            }
            $rootScope.$broadcast('reload');   
            globalService.updateData(month, $scope.userSettigs.customers_in_queue, $scope.userSettigs.total_coffe_kg, $scope.userSettigs.total_drink, $scope.userBalance, $scope.userSettigs.buy_total_coffe_kg);
              
        });


        //get total coffe kg
        $scope.buyCoffee = function() {
            var price = parseFloat($scope.user.coffee.type.pricePerKg);
            var balance = parseFloat($scope.user.balance);
            if (price <= balance) {
                $scope.userSettigs.buy_total_coffe_kg += 1;
                $scope.userBalance = parseFloat($scope.userBalance)-price;
                $scope.user.balance = $scope.userBalance;  
                $scope.userSettigs.total_coffe_kg += 1;
                globalService.buyKgCoffe();
            } else {
                growl.warning($filter('translate')('NOT_ENOUGTH_BALANCE_FOR', {
                    name: $filter('translate')('TABCOFFEE')
                }));
            }
        };

        $rootScope.$on('checkEquipmentFinish', function() {
            if (!$scope.game.equipmentChooseFinished) {
                growl.success($filter('translate')('THANKS_YOU_FINISHED'));
            }


            $rootScope.$emit('gameStartEvent');
            $rootScope.$broadcast('buyEquipment');
        });

        $rootScope.$on('gameStartEvent', function() {
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
            if ($scope.showGame) {
                getSuccesStatus();
            }
        });


        function userBalance() {
            userService.getBalance()
                .success(function(data) {
                    $scope.userBalance = data;
                });
        };

        function getSuccesStatus() {
            if (angular.isUndefined($scope.user)) {
                return;
            }
            var coffePrice = $scope.user.coffee.price.quality;
            var coffeType = $scope.user.coffee.type.quality;
            var employee = $scope.user.employee.quality;
            var place_machine_name = 0;

            angular.forEach($scope.user.equipment.items, function(val, key) {
                place_machine_name = place_machine_name + parseFloat(val.quality);
            }); 
            $scope.successBar = parseFloat(coffePrice) + parseFloat(coffeType) + parseFloat(employee) + parseFloat(place_machine_name);
            userBalance();
            userGetDetails();

        };


        function userGetDetails() {
            globalService.userGetDetails()
                .success(function(data) {
                    $scope.userSettigs.customers_in_queue = parseInt(data.customers_in_queue);
                    $scope.userSettigs.total_coffe_kg = parseFloat(data.total_coffe_kg);
                    $scope.userSettigs.total_drink = parseInt(data.total_drink);
                    $scope.userSettigs.buy_total_coffe_kg = parseFloat(data.buy_total_coffe_kg);
                    $rootScope.$broadcast('setopenedTime', parseFloat(data.opened_months)); 
                });
        };

        function setEquipment(type, data) {
            if (angular.isUndefined($scope.user)) {
                return;
            }
            switch (type) {
                case "coffeegrinders":
                    $scope.user.equipment.Add('grinder', data, false);
                    break;
                case "coffeemachines":
                    $scope.user.equipment.Add('machine', data, false);
                    break;
                case "coffeeplaces":
                    $scope.user.equipment.Add('place', data, false);
                    break;
                case "coffeetypes":
                    $scope.user.coffee.type.Set(data, false);
                    break;
                case "coffeeemployees":
                    $scope.user.employee.Set(data, false);
                    break;
                case "coffeedrinkprices":
                    $scope.user.coffee.price.Set(data, false);
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


        //display modal window with language list
        function checkCookie() { 
            setTimeout(function() { 
                if (!$scope.showGame) {
                    $('#myModalLanguage').modal();
                }
            }, 2000)
 
        }
        checkCookie();
    };
})();

(function() {
    'use strict'


    angular
        .module('coffeeGame')
        .controller('globalSettingsCtrl', globalSettingsCtrl);

    globalSettingsCtrl.$inject = ['$scope', '$rootScope', 'User', '$window', 'globalService'];

    function globalSettingsCtrl($scope, $rootScope, User, $window, globalService) {

        String.prototype.toHHMMSS = function() {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

        //reset all information for user
        $scope.globalReset = function() {
            globalService.resetData()
                .success(function(data) {
                    $window.location.reload()
                });
        };
 
            //get top user stats
        $scope.getTopUserStats = function() {
            globalService.getTopStats()
                .success(function(data) {
                    $scope.statsData = data; 
                });
        };
        $scope.getTopUserStats();
        setInterval(function() {
            $scope.getTopUserStats();
        }, 360000)

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

    GameProcessCtrl.$inject = ['$scope', '$interval', '$rootScope'];

    function GameProcessCtrl($scope, $interval, $rootScope) {
        $scope.model = {
            openedTime: 0
        };
        $scope.iterationNum = 0;

        var refreshTime = 1000;

        $scope.model.openedTimeDisplay = function() {
            return $scope.model.openedTime / (30 * 24 * 60 * 60 / 1000);
        };

        $interval(function() {
            var data = {
                'openedTimeDisplay': $scope.model.openedTime,
                'iterationNum':  $scope.iterationNum
            };
            if ($scope.iterationNum >= 11) {
                $scope.iterationNum = 0;
            }
            
            $rootScope.$broadcast('openedTimeDisplay', data);
            $scope.model.openedTime = $scope.model.openedTime + 1;

            $scope.iterationNum += 1;
        }, refreshTime);

        $rootScope.$on('setopenedTime', function(e, val) {
            $scope.model.openedTime = val;
        });
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
                $rootScope.$on('reload',function(){
                    initializeCofeGame('all');  
                });

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
                         $rootScope.$broadcast('checkEquipmentFinish'); 
                };
        };
})();

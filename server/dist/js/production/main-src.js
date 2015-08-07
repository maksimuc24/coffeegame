!function(){"use strict";angular.module("coffeeGame",["ngRoute","ngCookies","ui.bootstrap","angular-growl","pascalprecht.translate","ngSanitize"]),angular.element(document).ready(function(){angular.bootstrap(document,["coffeeGame"])}),angular.module("coffeeGame").run(function(){FastClick.attach(document.body)})}(),function(){"use strict";angular.module("coffeeGame").config(["$routeProvider",function(e){e.when("/index",{templateUrl:"app/pages/game/game.html"}).when("/login",{templateUrl:"app/pages/login/login.html"}).when("/register",{templateUrl:"app/pages/register/register.html"}).otherwise({redirectTo:"/index"})}])}(),function(){"use strict";function e(){var e=window.location.href,t="http://coffeegame/server";return e.indexOf("http://cafe.jaknakavu.eu/")>=0&&(t="http://cafe.jaknakavu.eu/server"),t}angular.module("coffeeGame").constant("serverUrl",e()),angular.module("coffeeGame").config(["$translateProvider","growlProvider",function(e,t){t.globalTimeToLive({success:5e3,error:5e3,warning:5e3,info:5e3}),e.translations("en",translationsEN),e.translations("cz",translationsCZ),e.translations("ru",translationsRU),e.translations("ua",translationsUA),e.preferredLanguage("en"),e.fallbackLanguage("cz"),e.useLocalStorage()}])}(),function(){"use strict";function e(e,t,n,o,a){var i=function(a){this.id=a.id,this.cafeName=a.cafeName,this.balance=-1,this.displayBalance=function(){return this.balance-this.equipment.TotalAmount()},this.equipment=new e,this.employee=new t,this.coffee={type:new n,price:new o}};return i.prototype.getBalance=function(){var e=this;return a.getBalance().success(function(t){e.balance=t})},i.prototype.isAuthenticated=function(){return""!=this.id&&void 0!=this.id},i.prototype.canBuyEquipment=function(e){var t=this.equipment.getItemPrice(name),n=this.employee.pricePerMonth?parseFloat(this.employee.pricePerMonth):0,o=this.coffee.type.pricePerKg?parseFloat(this.coffee.type.pricePerKg):0;return this.balance-this.equipment.TotalAmount()+t-n-o>item.price},i.prototype.canBuyEmployee=function(e){var t=this.employee.pricePerMonth?parseFloat(this.employee.pricePerMonth):0,n=this.coffee.type.pricePerKg?parseFloat(this.coffee.type.pricePerKg):0;return this.balance-this.equipment.TotalAmount()-t-n>e},i.prototype.canBuyCoffeeType=function(e){var t=this.employee.pricePerMonth?parseFloat(this.employee.pricePerMonth):0,n=this.coffee.type.pricePerKg?parseFloat(this.coffee.type.pricePerKg):0;return this.balance-this.equipment.TotalAmount()-t-n>e},i.prototype.update=function(e){3==this.equipment.items.length&&0!=this.employee.id&&0!=this.coffee.type.id&&0!=this.coffee.price.id&&e()},i}angular.module("coffeeGame").factory("User",e),e.$inject=["UserEquipment","Employee","CoffeeType","CoffeePrice","userService"]}(),function(){"use strict";function e(e,t){var n=t+"/authentication",o={};return o.validate=function(){return e.get(n+"/check.php")},o.logout=function(){return e.get(n+"/logout.php")},o.startPlay=function(){return e.get(n+"/start_play.php")},o.isPlay=function(){return e.get(n+"/is_play.php")},o.login=function(t){return e({url:n+"/auth.php",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:$.param({cafeName:t.cafeName,password:t.password,submit:t.submit})})},o}angular.module("coffeeGame").factory("authenticationService",e),e.$inject=["$http","serverUrl"]}(),function(){"use strict";function e(e){var t=function(){this.id=0,this.price=0,this.quality=0};return t.prototype.Set=function(t,n){n&&e.setUserEquipment(t.id,t.equipment_type_id,parseFloat(t.price)),this.id=t.id,this.price=t.price,this.quality=t.quality},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("CoffeePrice",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e){var t=function(){this.id=0,this.name="",this.pricePerKg=0,this.quality=0};return t.prototype.Set=function(t,n){n&&e.setUserEquipment(t.id,t.equipment_type_id,parseFloat(t.price)),this.id=t.id,this.name=t.name,this.quality=t.quality,this.pricePerKg=t.price},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("CoffeeType",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e){var t=function(){this.id=0,this.pricePerMonth=0,this.name="",this.quality=0};return t.prototype.Set=function(t,n){n&&e.setUserEquipment(t.id,t.equipment_type_id,parseFloat(t.price)),this.id=t.id,this.quality=t.quality,this.pricePerMonth=t.price,this.name=t.name},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("Employee",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e,t){var n=t+"/game/api/settings",o={};return o.getCoffeeGrinders=function(){return e.get(n+"/grinders")},o.getSavedUserEquipment=function(){return e.get(n+"/get-user-equipment")},o.getCoffeeMachines=function(){return e.get(n+"/machines")},o.getCoffeePlaces=function(){return e.get(n+"/places")},o.getCoffeeEmployees=function(){return e.get(n+"/employees")},o.getCoffeeTypes=function(){return e.get(n+"/coffeeTypes")},o.getCoffeePrices=function(){return e.get(n+"/coffeePrices")},o.getUserEquipment=function(){return e.get(n+"/getUserEquipment")},o.setUserEquipment=function(t,o,a){return e({url:n+"/setUserEquipment",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:$.param({equipmentId:t,equipmentTypeId:o,equipmentPrice:a})})},o}angular.module("coffeeGame").factory("gameSettingsService",e),e.$inject=["$http","serverUrl"]}(),function(){"use strict";function e(e,t,n){var o=t+"/game/api/user",a={};return a.resetData=function(){return e.get(o+"/reset-balance")},a.userGetDetails=function(){return e.get(o+"/get-details")},a.buyKgCoffe=function(){return e.get(o+"/buy-kg-coffe")},a.updateData=function(t,n,a,i,r,s){return e({url:o+"/update-data",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:$.param({opened_months:t,customers_in_queue:n,total_coffe_kg:a,total_drink:i,balance:r,buy_total_coffe_kg:s})})},a}angular.module("coffeeGame").factory("globalService",e),e.$inject=["$http","serverUrl","$q"]}(),function(){"use strict";function e(e){var t=function(){this.items=[]};return t.prototype.Add=function(t,n,o){if(o&&e.setUserEquipment(n.id,n.equipment_type_id,parseFloat(n.price)),this.Exists(t)){var a=this.IndexOf(t);this.items[a].name=t,this.items[a].quality=n.quality,this.items[a].id=n.id,this.items[a].price=parseFloat(n.price),this.items[a].item=n.item}else this.items.push({name:t,quality:n.quality,id:n.id,price:parseFloat(n.price),item:n})},t.prototype.Exists=function(e,t){for(var n=0;n<this.items.length;n++)if(this.items[n].name==e&&(!t||this.items[n].id==t))return!0},t.prototype.IndexOf=function(e,t){for(var n=0;n<this.items.length;n++)if(this.items[n].name==e&&(!t||this.items[n].id==t))return n},t.prototype.getItemPrice=function(e){if(this.Exists(e)){var t=this.IndexOf(e);return parseFloat(this.items[t].price)}return 0},t.prototype.TotalAmount=function(){for(var e=0,t=0;t<this.items.length;t++)e+=parseFloat(this.items[t].price);return e},t.prototype.update=function(e){e()},t}angular.module("coffeeGame").factory("UserEquipment",e),e.$inject=["gameSettingsService"]}(),function(){"use strict";function e(e,t){var n=t+"/game/api/user",o={};return o.getBalance=function(){return e.get(n+"/balance")},o.heartbeat=function(){return e.get(n+"/heartbeat")},o}angular.module("coffeeGame").factory("userService",e),e.$inject=["$http","serverUrl"]}(),function(){"use strict";function e(e,t,n,o){function a(){r||(r=n(function(){o.heartbeat()},5e3))}function i(){r&&(n.cancel(r),r=void 0)}var r;t.$on("userLogin",function(){a()}),t.$on("userLogout",function(){i()})}angular.module("coffeeGame").controller("HeartbeatCtrl",e),e.$inject=["$scope","$rootScope","$timeout","userService"]}(),function(){"use strict";function e(e,t,n,o){function a(){n.validate().success(function(n){var o={id:n.user_id,cafeName:n.cafeName};""!=o.id&&void 0!=o.id?(e.user.authorized=!0,e.user.cafeName=o.cafeName,t.$broadcast("userLogin",o)):e.user.authorized=!1})}e.user={authorized:!1},a(),e.$on("$routeChangeStart",function(e,t){a()}),e.logout=function(){n.logout(),t.$broadcast("userLogout"),o.location.reload()}}angular.module("coffeeGame").controller("UserAuthCtrl",e),e.$inject=["$scope","$rootScope","authenticationService","$window"]}(),function(){"use strict";function e(e){}angular.module("coffeeGame").controller("UserBalanceCtrl",e),e.$inject=["$scope"]}(),function(){"use strict";function e(e,t,n,o,a,i,r,s,c){function u(){i.getBalance().success(function(t){e.userBalance=t})}function l(){if(!angular.isUndefined(e.user)){var t=e.user.coffee.price.quality,n=e.user.coffee.type.quality,o=e.user.employee.quality,a=0;angular.forEach(e.user.equipment.items,function(e,t){a+=parseFloat(e.quality)}),console.log("getSuccesStatus"),console.log("getSuccesStatus",e.userSettigs),e.successBar=parseFloat(t)+parseFloat(n)+parseFloat(o)+parseFloat(a),u(),f()}}function f(){r.userGetDetails().success(function(n){e.userSettigs.customers_in_queue=parseInt(n.customers_in_queue),e.userSettigs.total_coffe_kg=parseFloat(n.total_coffe_kg),e.userSettigs.total_drink=parseInt(n.total_drink),e.userSettigs.buy_total_coffe_kg=parseFloat(n.buy_total_coffe_kg),t.$broadcast("setopenedTime",parseFloat(n.opened_months)),console.log("userGetDetails"),console.log(n),console.log("buy_total_coffe_kg",e.userSettigs.buy_total_coffe_kg)})}function p(t,n){if(!angular.isUndefined(e.user))switch(t){case"coffeegrinders":e.user.equipment.Add("grinder",n,!1);break;case"coffeemachines":e.user.equipment.Add("machine",n,!1);break;case"coffeeplaces":e.user.equipment.Add("place",n,!1);break;case"coffeetypes":e.user.coffee.type.Set(n,!1);break;case"coffeeemployees":e.user.employee.Set(n,!1);break;case"coffeedrinkprices":e.user.coffee.price.Set(n,!1)}}function m(){o.isPlay().success(function(t){angular.isUndefined(t.status)||(e.game.equipmentChooseFinished=!0,e.setUserEquipment())})}function d(){o.validate().success(function(t){return angular.isUndefined(t.user_id)?void(e.showGame=!1):void(e.showGame=!0)})}function g(){console.log(e.showGam),setTimeout(function(){console.log("sdasd ",e.showGame),e.showGame||$("#myModalLanguage").modal()},2e3),console.log("sssssss")}e.game={},e.showGame=!1,e.userBalance=0,e.userSettigs={customers_in_queue:0,total_coffe_kg:0,total_drink:0,buy_total_coffe_kg:0},e.showMainImg=function(){var t=!1;if(angular.isUndefined(e.user))var t=!0;return t},e.showSelect=function(){return!e.game.equipmentChooseFinished},e.showBar=function(){return e.game.equipmentChooseFinished},e.sellCoffe=function(){if(e.userSettigs.customers_in_queue<=0)return e.userSettigs.buy_total_coffe_kg=e.userSettigs.buy_total_coffe_kg-.014,void(e.userSettigs.total_drink+=1);var t=e.userSettigs.buy_total_coffe_kg-.014;if(0>t)return void s.warning(c("translate")("NEED_BUY_KG_COFFE"));var n=parseFloat(e.user.coffee.price.price);e.userSettigs.customers_in_queue-=1,e.userBalance=parseFloat(e.userBalance)+n,e.user.balance=e.userBalance,e.userSettigs.total_drink+=1,e.userSettigs.buy_total_coffe_kg=e.userSettigs.buy_total_coffe_kg-.014},e.customers_in_queue=function(){var t,n=e.user.coffee.price.quality,o=Math.floor(500*Math.random())+1,a=e.successBar;t=10*n*o*(a/100)*Math.abs(1-a*n),t=t.toFixed(),t>=0&&(e.userSettigs.customers_in_queue=t)},t.$on("openedTimeDisplay",function(n,o){var a=o.openedTimeDisplay,i=o.openedTimeDisplay/2592;if(parseInt(i)==i&&i>0){var s,c;angular.forEach(e.user.equipment.items,function(e,t){"place"==e.name&&(s=e.price)}),c=parseFloat(e.user.employee.pricePerMonth),e.user.balance=parseFloat(e.user.balance)-c-s,e.userBalance=e.user.balance}2==o.iterationNum&&e.customers_in_queue(),t.$broadcast("reload"),console.log(e.userSettigs.buy_total_coffe_kg),r.updateData(a,e.userSettigs.customers_in_queue,e.userSettigs.total_coffe_kg,e.userSettigs.total_drink,e.userBalance,e.userSettigs.buy_total_coffe_kg)}),e.buyCoffee=function(){var t=parseFloat(e.user.coffee.type.pricePerKg),n=parseFloat(e.user.balance);n>=t?(e.userSettigs.buy_total_coffe_kg+=1,e.userBalance=parseFloat(e.userBalance)-t,e.user.balance=e.userBalance,e.userSettigs.total_coffe_kg+=1,r.buyKgCoffe()):s.warning(c("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:c("translate")("TABCOFFEE")}))},t.$on("checkEquipmentFinish",function(){e.game.equipmentChooseFinished||s.success(c("translate")("THANKS_YOU_FINISHED")),t.$emit("gameStartEvent"),t.$broadcast("buyEquipment")}),t.$on("gameStartEvent",function(){o.startPlay(),e.game.equipmentChooseFinished=!0,l()}),t.$on("userLogin",function(t,o){e.user=new n(o),e.user.getBalance(),m()}),t.$on("buyEquipment",function(t,n){e.showGame&&l()}),e.setUserEquipment=function(){a.getSavedUserEquipment().success(function(e){e&&angular.forEach(e,function(e){angular.forEach(e,function(e,t){p(t,e)})}),l()})},m(),d(),e.$on("userLogout",function(){d()}),e.$on("userLogin",function(){d()}),g()}angular.module("coffeeGame").controller("GameCtrl",e),e.$inject=["$scope","$rootScope","User","authenticationService","gameSettingsService","userService","globalService","growl","$filter"]}(),function(){"use strict";function e(e,t,n,o,a){e.globalReset=function(){a.resetData().success(function(e){o.location.reload()})}}angular.module("coffeeGame").controller("globalSettingsCtrl",e),e.$inject=["$scope","$rootScope","User","$window","globalService"]}(),function(){"use strict";function e(e,t,n){e.model={cafeName:"",password:""},e.login=function(){t.login({cafeName:e.model.cafeName,password:e.model.password,submit:"submit"}).success(function(e){n.path("/")})}}angular.module("coffeeGame").controller("LoginCtrl",e),e.$inject=["$scope","authenticationService","$location"]}(),function(){"use strict";function e(e,t){e.changeLanguage=function(e){t.uses(e)}}angular.module("coffeeGame").controller("TranslateCtrl",e),e.$inject=["$scope","$translate"]}(),function(){"use strict";function e(e,t,n){e.model={openedTime:0},e.iterationNum=0;var o=1e3;e.model.openedTimeDisplay=function(){return e.model.openedTime/2592},t(function(){var t={openedTimeDisplay:e.model.openedTime,iterationNum:e.iterationNum};e.iterationNum>=11&&(e.iterationNum=0),n.$broadcast("openedTimeDisplay",t),e.model.openedTime=e.model.openedTime+1,e.iterationNum+=1},o),n.$on("setopenedTime",function(t,n){e.model.openedTime=n})}angular.module("coffeeGame").controller("GameProcessCtrl",e),e.$inject=["$scope","$interval","$rootScope"]}(),function(){"use strict";function e(e,t,n,o,a,i){function r(){i.getBalance().success(function(t){e.balance=parseFloat(t)})}function s(e){"grinder"!=e&&u(),"machine"!=e&&l(),"place"!=e&&f(),"employee"!=e&&p(),"coffe"!=e&&m(),"drink_price"!=e&&d(),c(),r()}function c(){n.getUserEquipment().success(function(t){e.selectedEquipment=t})}function u(){n.getCoffeeGrinders().success(function(t){e.model.coffeeGrinders=t})}function l(){n.getCoffeeMachines().success(function(t){e.model.coffeeMachines=t})}function f(){n.getCoffeePlaces().success(function(t){e.model.coffeePlaces=t})}function p(){n.getCoffeeEmployees().success(function(t){e.model.coffeeEmployees=t})}function m(){n.getCoffeeTypes().success(function(t){e.model.coffeeTypes=t})}function d(){n.getCoffeePrices().success(function(t){e.model.coffeePrices=t})}function g(){t.$broadcast("checkEquipmentFinish")}e.tabs=[{name:"Grinder",active:!0},{name:"Machine",active:!1},{name:"Place",active:!1},{name:"Employees",active:!1},{name:"Coffee",active:!1},{name:"Drink price",active:!1}],e.selectedEquipment={grinder:null,machine:null,place:null,employee:null,coffe:null,drink_price:null},e.model={},r(),s("all"),t.$on("reload",function(){s("all")}),e.openAccordion=function(e){var t="#accordion-"+e;$(t).click()},e.addSelectedNameToEquipment=function(t,n){e.selectedEquipment[t]=n.id},e.chooseCoffeeGinder=function(n){e.balance<n.price?o.warning(a("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:a("translate")("TABGRINDER")})):(e.user.equipment.Add("grinder",n,!0),e.addSelectedNameToEquipment("grinder",n),s("all"),e.openAccordion(2),o.success(a("translate")("THANKS_YOU_CHOSEN",{name:a("translate")("TABGRINDER")})),e.user.update(g),t.$broadcast("buyEquipment"))},e.chooseCoffeeMachine=function(n){e.balance<n.price?o.warning(a("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:a("translate")("TABMACHINE")})):(e.user.equipment.Add("machine",n,!0),e.addSelectedNameToEquipment("machine",n),s("all"),e.openAccordion(3),o.success(a("translate")("THANKS_YOU_CHOSEN",{name:a("translate")("TABMACHINE")})),t.$broadcast("buyEquipment"),e.user.update(g))},e.chooseCoffeePlace=function(n){e.balance<n.price?o.warning(a("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:a("translate")("TABPLACE")})):(e.user.equipment.Add("place",n,!0),e.addSelectedNameToEquipment("place",n),s("all"),e.openAccordion(4),o.success(a("translate")("THANKS_YOU_CHOSEN",{name:a("translate")("TABPLACE")})),t.$broadcast("buyEquipment"),e.user.update(g))},e.chooseCoffeeEmployee=function(n){e.balance<n.price?o.warning(a("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:a("translate")("TABEMPLOYEES")})):(e.user.employee.Set(n,!0),e.addSelectedNameToEquipment("employee",n),s("all"),e.openAccordion(5),o.success(a("translate")("THANKS_YOU_CHOSEN",{name:a("translate")("TABEMPLOYEES")})),t.$broadcast("buyEquipment"),e.user.update(g))},e.chooseCoffeeType=function(n){e.balance<n.price?o.warning(a("translate")("NOT_ENOUGTH_BALANCE_FOR",{name:a("translate")("TABCOFFEE")})):(e.user.coffee.type.Set(n,!0),e.addSelectedNameToEquipment("coffe",n),s("all"),e.openAccordion(6),o.success(a("translate")("THANKS_YOU_CHOSEN",{name:a("translate")("TABCOFFEE")})),e.user.update(g),t.$broadcast("buyEquipment"))},e.chooseCoffeePrice=function(n){e.user.coffee.price.Set(n,!0),o.success(a("translate")("THANKS_YOU_CHOSEN",{name:a("translate")("TABPRICE")})),s("all"),e.addSelectedNameToEquipment("drink_price",n),e.user.update(g),t.$broadcast("buyEquipment")}}angular.module("coffeeGame").controller("StartEquipmentChooseCtrl",e),e.$inject=["$scope","$rootScope","gameSettingsService","growl","$filter","userService"]}();
(function() {
        'use strict'

   
        angular.module('coffeeGame', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angular-growl']);
          

        angular.element(document).ready(function() {
                angular.bootstrap(document, ['coffeeGame']);
        });
})();

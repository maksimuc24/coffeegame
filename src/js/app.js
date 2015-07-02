(function() {
        'use strict'


        angular
                .module('coffeeGame', ['ngRoute',
                        'ngCookies',
                        'ui.bootstrap',
                        'angular-growl',
                        'pascalprecht.translate'
                ]);


        angular
                .element(document)
                .ready(function() {
                        angular.bootstrap(document, ['coffeeGame']);
                });
 
})();

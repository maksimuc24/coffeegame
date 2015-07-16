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

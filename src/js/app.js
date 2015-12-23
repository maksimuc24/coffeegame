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

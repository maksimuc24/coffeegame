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
                        growlProvider.globalTimeToLive({success: 3000, error: 3000, warning: 3000, info: 4000});
                        
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

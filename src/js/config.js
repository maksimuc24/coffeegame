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
})();

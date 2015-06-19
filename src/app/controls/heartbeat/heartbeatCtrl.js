app.controller('HeartbeatCtrl', function($scope, $rootScope, $timeout, userService){

    var timer;
    
    $rootScope.$on('userLogin', function() { 
		startHeartbeat();
 	});	
    
    $rootScope.$on('userLogout', function() { 
		stopHeartbeat();
 	});	

	function startHeartbeat(){
        if(!timer){
            timer = $timeout(
                function(){
                    userService.heartbeat();
                }, 
            5000);
        }
	};
    
    function stopHeartbeat(){
        if(timer){
            $timeout.cancel(timer);
            timer = undefined;
        }
    };
});
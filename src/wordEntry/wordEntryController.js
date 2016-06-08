 window.wordApp.wordEntryController = function($scope, WordsService,pubsub){
	$scope.model = {show : false};

	function startTimer(duration, display) {
    	var timer = duration, minutes, seconds;
   			 setInterval(function () {
       		 minutes = parseInt(timer / 60, 10);
       		 seconds = parseInt(timer % 60, 10);
        	 minutes = minutes < 10 ? "0" + minutes : minutes;
        	 seconds = seconds < 10 ? "0" + seconds : seconds;
             display.textContent =  "00:" + seconds;
        if (--timer < 0) {
            timer = duration;
       	 }
    	}, 1000);
	}

     var onGetFirstMangledHandler = function(data){
       $scope.model.mangledWord = data;
       $scope.model.show = true;

        //start the counter
	    var fortySeconds = 40,
        display = document.querySelector('#counter');
    	startTimer(fortySeconds, display);
       
    };

	$scope.init = function(){
		pubsub.addListener("firstMangledWord", $scope, onGetFirstMangledHandler);
	};
   
	$scope.submit = function(){};

	$scope.refresh = function(){
       WordsService.getRandomWord();
	};
};

window.wordApp.wordEntryController.$inject = ['$scope', 'WordsService', 'pubsubProvider'];
window.wordApp.controller('wordEntryController', window.wordApp.wordEntryController);
 window.wordApp.wordEntryController = function($scope, WordsService,SaveScoreService,pubsub){
	$scope.model = {show : false};

	

     var onGetFirstMangledHandler = function(data){
       $scope.model.mangledWord = data;
       $scope.model.show = true;
        var fortySeconds = 10,
        display = document.querySelector('#counter');
    	SaveScoreService.StartTimer(fortySeconds, display);
    };

	$scope.init = function(){
		pubsub.addListener("firstMangledWord", $scope, onGetFirstMangledHandler);
	};
   
	$scope.submit = function(){};

	$scope.refresh = function(){
       WordsService.getRandomWord();
	};
};

window.wordApp.wordEntryController.$inject = ['$scope', 'WordsService', 'SaveScoreService','pubsubProvider'];
window.wordApp.controller('wordEntryController', window.wordApp.wordEntryController);
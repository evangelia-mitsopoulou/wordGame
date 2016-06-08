 window.wordApp.wordEntryController = function($scope, WordsService,pubsub){
	$scope.model = {show : false};

     var onGetFirstMangledHandler = function(data){
       $scope.model.mangledWord = data;
       $scope.model.show = true;
       
    };

	$scope.init = function(){
		console.log('on');
		pubsub.addListener("firstMangledWord", $scope, onGetFirstMangledHandler);
	};
   
	$scope.submit = function(){};

	$scope.refresh = function(){
       WordsService.getRandomWord();
	};
};

window.wordApp.wordEntryController.$inject = ['$scope', 'WordsService', 'pubsubProvider'];
window.wordApp.controller('wordEntryController', window.wordApp.wordEntryController);
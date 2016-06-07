 window.wordAp.wordEntryController = function($scope, WordsService,pubsub){
	$scope.model = {};

	$scope.init = function(){
		pubsub.addListener("wordsListReceived", $scope, onGetFirstMangledHandler);
	};
   
	$scope.submit = function(){};

	$scope.refresh = function(){
       WordsService.getRandomWord();
	};

    function onGetFirstMangledHandler(data){
       $scope.model.mangledWord = data;
    }
};

window.wordApp.homeController.$inject = ['$scope', 'WordsService', 'pubsubProvider'];
window.wordApp.controller('wordEntryController', window.wordAp.wordEntryController);
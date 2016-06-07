window.wordApp.homeController = function($scope, WordsService){
	$scope.init = function(){

       //pubsub.addListener("wordsListReceived", $scope, onGetMediaHandler);

		WordsService.getWordsList()
		.then(function(res){
			//pubsub.addObserver("wordsListReceived", res.data);
			WordsService.setWordList(res.data);
		}, function(){
			console.log('data failed');	
		});
	};

	$scope.start = function(){};

	$scope.viewScores = function(){};
};

window.wordApp.homeController.$inject = ['$scope', 'WordsService'];
window.wordApp.controller('homeController', window.wordApp.homeController);
window.wordApp.homeController = function($scope, WordsService,pubsub){
	
	$scope.init = function(){
    	WordsService.getWordsList()
		.then(function(res){
			WordsService.setWordList(res.data);
		}, function(){
			console.log('data failed');	
		});
	};

	$scope.start = function(){
		var rWord=WordsService.getRandomWord();
		pubsub.addObserver("firstMangledWord", rWord);
	};

	$scope.viewScores = function(){};
};

window.wordApp.homeController.$inject = ['$scope', 'WordsService', 'pubsubProvider'];
window.wordApp.controller('homeController', window.wordApp.homeController);
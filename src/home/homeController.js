window.wordApp.homeController = function($scope, WordsService,SaveScoreService,pubsub){

	$scope.init = function(){
		$scope.model = {show:true};
    	WordsService.getWordsList()
		.then(function(res){
			WordsService.setWordList(res.data);
		}, function(){
			console.log('data failed');	
		});
	};

	$scope.start = function(){
		$scope.model.show = false; 
		var rWord=WordsService.getRandomWord();
		pubsub.addObserver("firstMangledWord", rWord);
	};

	$scope.viewScores = function(){
		SaveScoreService.getScoreList().then(function(res){
		pubsub.addObserver("scoreListReceived", res.data);
		},function(){
		});
	};
};

window.wordApp.homeController.$inject = ['$scope', 'WordsService','SaveScoreService','pubsubProvider'];
window.wordApp.controller('homeController', window.wordApp.homeController);
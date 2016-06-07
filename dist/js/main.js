var wordApp = angular.module('wordGame',['ngRoute']);
 

wordApp.config(function($routeProvider){	
	$routeProvider
	.when('/', {
                templateUrl : 'src/home/homeView.html',
                controller  : 'homeController'
            })
	.when('/scores', {
                templateUrl : 'src/scoreList/scoresListView.html',
                controller  : 'scoresListController'
            })
	.when('/word-entry', {
                templateUrl : 'src/wordEntry/wordEntryView.html',
                controller  : 'wordEntryController'
            });
 });
window.wordApp.WordsService = function($http){

	var _this =this;

	var shuffleWordsLetters = function(){
		 console.log('in shuffle words', _this.words);
		 
		 for (var i=0; i<=_this.words .length-1;i++){

		 var shuffledWord = _this.words[i].split('');
		 console.log('shuffled word', shuffledWord);
		 var currentIndex = shuffledWord.length, temporaryValue, randomIndex;

  		// While there remain elements to shuffle...
  		while (0 !== currentIndex) {

    	// Pick a remaining element...
    	randomIndex = Math.floor(Math.random() * currentIndex);
   		currentIndex -= 1;

    	// And swap it with the current element.
    	temporaryValue = shuffledWord[currentIndex];
   		shuffledWord[currentIndex] = shuffledWord[randomIndex];
    	shuffledWord[randomIndex] = temporaryValue;

	  	   }
         console.log('shuffled word later ',shuffledWord);
    	 //shuffledWord.join();
	  
         _this.words[i] = shuffledWord.join(' ').toString();
		 }
console.log('shuffle list', _this.words);


	};



	this.getWordsList = function(){
		return $http.get('https://brilliant-torch-9360.firebaseio.com/words.json');
	};


	this.setWordList = function(wordList){
		_this.words = wordList;
		shuffleWordsLetters();
	};
};
window.wordApp.WordsService.$inject = ['$http'];
window.wordApp.service('WordsService', window.wordApp.WordsService);



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
window.wordApp.controller('scoresListController',['$scope', function($scope){
	$scope.backToStart = function(){};
}]);

window.wordApp.pubsubProvider = function($rootScope){
    
    var observers = {};

    var listeners = {};

    var addObserver = function(eventName, item, e) {
        $rootScope.$broadcast(eventName, item  ? { item: item } : e);
        observers[eventName]= this.addObserver; 
    };

    var addListener = function(eventName,$scope, handler) {
        $scope.$on(eventName, function (e, args) {
            handler(args.item);
        });

      listeners["on"+eventName]= this.addListener; 
    };

    return { 
            observers: observers,
            listeners: listeners, 
            addObserver:addObserver, 
            addListener:addListener 
           };

};

window.wordApp.pubsubProvider.$inject = ['$rootScope'];
window.wordApp.factory("pubsubProvider", window.wordApp.pubsubProvider);



window.wordApp.controller('wordEntryController',['$scope', function($scope){
	$scope.submit = function(){};
}]);
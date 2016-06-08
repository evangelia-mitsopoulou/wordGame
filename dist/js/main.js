var wordApp = angular.module('wordGame',['ngRoute']);
 

wordApp.config(function($routeProvider){	
	$routeProvider
	.when('/', {
                templateUrl : 'src/index.html',
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
	_this.recentMangledWords = []; //it improves the randomness

	var shuffleWordsLetters = function(){
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
         _this.words[i] = shuffledWord.join('').toString();
		 }		
		console.log('shuffle list', _this.words);
	};

    /* A helper method that empties and resets the most 
     * recent used mangled words list
     *  Max size of the array is 3 
     */

    var updateRecentMangledWords = function(randomWord){
    	if (_this.recentMangledWords.length < 2) {
    		_this.recentMangledWords.push(randomWord);
    	} else {
            _this.recentMangledWords.shift();
            _this.recentMangledWords.push(randomWord);
    	}
    };

	this.getWordsList = function(){
		return $http.get('https://brilliant-torch-9360.firebaseio.com/words.json');
	};


	this.setWordList = function(wordList){
		_this.words = wordList;
		shuffleWordsLetters();
	};

	this.getRandomWord = function(){
        var randomWord = _this.words [Math.floor(Math.random()*_this.words .length)];
        if (randomWord in _this.recentMangledWords)  {
        	this.getRandomWord(); 
        } else {
        	updateRecentMangledWords(randomWord);
        	return randomWord;
        }		
	};

};
window.wordApp.WordsService.$inject = ['$http'];
window.wordApp.service('WordsService', window.wordApp.WordsService);



window.wordApp.homeController = function($scope, WordsService,pubsub){
	
	
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

	$scope.viewScores = function(){};
};

window.wordApp.homeController.$inject = ['$scope', 'WordsService', 'pubsubProvider'];
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
            timer = 0;
       	 }
    	}, 1000);
	}

     var onGetFirstMangledHandler = function(data){
       $scope.model.mangledWord = data;
       $scope.model.show = true;

        //start the counter
	    var fortySeconds = 4,
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
window.wordApp.wordEntry = function(){
	 return {
      restrict: 'AE',
      templateUrl: 'src/wordEntry/WordEntryTemplate.html'
  };
};

window.wordApp.directive('wordEntry', window.wordApp.wordEntry);
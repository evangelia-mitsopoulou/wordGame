var wordApp = angular.module('wordGame',['angularModalService']);
 
wordApp.constant('Configuration', {
    WordsListUrl : 'https://brilliant-torch-9360.firebaseio.com/words.json',
    UsersUrl : 'https://brilliant-torch-9360.firebaseio.com/users.json'
});
window.wordApp.WordsService = function($http, config){

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
		return $http.get(config.WordsListUrl);
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
window.wordApp.WordsService.$inject = ['$http', 'Configuration'];
window.wordApp.service('WordsService', window.wordApp.WordsService);



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
		$scope.model.show = false; 
		SaveScoreService.getScoreList().then(function(res){
		pubsub.addObserver("scoreListReceived", res.data);
		},function(){
			console.log('score list data not received');
		});
	};
};

window.wordApp.homeController.$inject = ['$scope', 'WordsService','SaveScoreService','pubsubProvider'];
window.wordApp.controller('homeController', window.wordApp.homeController);
window.wordApp.scoreList= function(){
	 return {
      restrict: 'AE',
      templateUrl: 'src/scoreList/scoresListTemplate.html'
  };
};

window.wordApp.directive('scoreList', window.wordApp.scoreList);
window.wordApp.scoreListController = function($scope,pubsub){
	
	$scope.model = {show : false};
	$scope.scorelist = {};

	function onReceiveScoreListHandler(data){
		$scope.model.show = true;
		console.log('score list on controller is ',data);
		//traverse through the retrieved object
		var obj = data;
		var scoreItem;
		var k=0;
		for (var i in obj) {
			if (obj.hasOwnProperty(i)){
				scoreItem = obj[i];
				$scope.scorelist[k]=scoreItem;
				k=k+1;
			}
		}
		console.log('beautified scoelist is', $scope.scorelist);
	}

	$scope.backToStart = function(){};
	$scope.init = function(){
      pubsub.addListener("scoreListReceived",$scope,onReceiveScoreListHandler);
	};

	

};
window.wordApp.scoreListController.$inject = ['$scope','pubsubProvider'];
window.wordApp.controller('scoreListController', window.wordApp.scoreListController);


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

window.wordApp.SaveScoreService= function($http, config,pubsub){

  var _this = this;

  this.StartTimer = function(duration, display){
	   var timer = duration, minutes, seconds;
   			var refreshId = setInterval(function () {
       		 minutes = parseInt(timer / 60, 10);
       		 seconds = parseInt(timer % 60, 10);
        	 minutes = minutes < 10 ? "0" + minutes : minutes;
        	 seconds = seconds < 10 ? "0" + seconds : seconds;
             display.textContent =  "00:" + seconds;
        if (--timer < 0) {
            timer = 0;
            pubsub.addObserver("timeout","test");     
             clearInterval(refreshId);
       	 }
      
        
    	}, 1000);     
  };
  

  this.submitScore = function(data){
     return $http.post(config.UsersUrl, data);
  };


 this.getMaxScore = function(wordLength){
    var x= wordLength/3;
    var maxScore = Math.floor(Math.pow(1.95, x));
    _this.maxScore = maxScore;
    return maxScore;
 };

 this.getScoreList = function(){
     return $http.get(config.UsersUrl);
 };


};
window.wordApp.SaveScoreService.$inject = ['$http','Configuration','pubsubProvider'];
window.wordApp.service('SaveScoreService', window.wordApp.SaveScoreService);
window.wordApp.controller('ModalController', function ($scope, close) {
   $scope.close = function(result) {
  close(result, 500); // close, but give 500ms for bootstrap to animate
 };
});
 /*jshint maxparams: 6 */
 window.wordApp.wordEntryController = function($scope, WordsService,SaveScoreService,pubsub,ModalService){
	$scope.model = {show : false};
  $scope.model.modal = false;

 function onTimeoutHandler(data){
    console.log('time out reacher', data);

         ModalService.showModal({
           templateUrl: 'src/shared/modal.html',
            controller: "ModalController"
    });
    document.getElementById('Name').setAttribute('disabled', true);
    document.getElementById('Word').setAttribute('disabled', true);
    document.getElementById('Submit').setAttribute('disabled', true);
 }

  function calculateScore (elWord){
    var score;
     if (elWord === $scope.model.mangledWord && $scope.deleteCounter ===0) {
      score = SaveScoreService.getMaxScore();
      } else {
      score = $scope.model.maxscore - $scope.deleteCounter;
      if (score < 0) {
      score = 0;
      }
    }
    return score;
  }


     var onGetFirstMangledHandler = function(data){
       $scope.model.mangledWord = data;
       $scope.model.show = true;
       $scope.model.score = 0;
       $scope.model.maxscore = SaveScoreService.getMaxScore(data.length);
       console.log('max score ', $scope.model.maxscore);
       var fortySeconds = 40,
       display = document.querySelector('#counter');
       SaveScoreService.StartTimer(fortySeconds, display);
    };

  $scope.init = function(){
    $scope.previousLength = 0; 
    $scope.deleteCounter = 0;
    $scope.timerOut=false;
    pubsub.addListener("firstMangledWord", $scope, onGetFirstMangledHandler);
    pubsub.addListener("timeout",$scope,onTimeoutHandler);
  };
   
   $scope.$watch('name', function(){
   	var val;
   	var elName = document.getElementById('Name');
   	var elSubmit = document.getElementById('Submit');
   		if (elName!== null){
   		val=elName.value;
   		if (val.length >1 && elSubmit.hasAttribute("disabled") === true) {
   			elSubmit.removeAttribute("disabled");
   		}
   	}
   });

    $scope.$watch('word', function(){
   	var val;
   	var elWord = document.getElementById('Word');
    
   	if (elWord !== null) {
         val = elWord.value;
         if (val.length >1 && $scope.previousLength < val.length) {
         $scope.previousLength=val.length;      
        } else if (val.length >1 &&  $scope.previousLength >= val.length) {
            $scope.deleteCounter= $scope.deleteCounter + 1; 
            $scope.previousLength=val.length;
        }
   	}
    console.log( 'delete counter', $scope.deleteCounter);
   });


   
	$scope.submit = function(){
    var elWordValue=document.getElementById('Word').value;
    var score=calculateScore(elWordValue);
    $scope.model.score = score;
    var username = document.getElementById('Name').value;
    var data={name:username, score:score};
		SaveScoreService.submitScore(data).then(function(res){
      console.log('data successfully submitted', res);
    },function(){});
	};

	$scope.refresh = function(){
       WordsService.getRandomWord();
	};

};

window.wordApp.wordEntryController.$inject = ['$scope', 'WordsService', 'SaveScoreService','pubsubProvider', 'ModalService'];
window.wordApp.controller('wordEntryController', window.wordApp.wordEntryController);


window.wordApp.wordEntry = function(){
	 return {
      restrict: 'AE',
      templateUrl: 'src/wordEntry/WordEntryTemplate.html'
  };
};

window.wordApp.directive('wordEntry', window.wordApp.wordEntry);
window.wordApp.WordsService = function($http){

	var _this =this;

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

	this.getWordsList = function(){
		return $http.get('https://brilliant-torch-9360.firebaseio.com/words.json');
	};


	this.setWordList = function(wordList){
		_this.words = wordList;
		shuffleWordsLetters();
	};

	this.getRandomWord = function(){
		return _this.words [Math.floor(Math.random()*_this.words .length)];
	};
};
window.wordApp.WordsService.$inject = ['$http'];
window.wordApp.service('WordsService', window.wordApp.WordsService);



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



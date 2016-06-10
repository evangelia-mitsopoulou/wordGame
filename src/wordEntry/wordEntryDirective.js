window.wordApp.wordEntry = function(){
	 return {
      restrict: 'AE',
      templateUrl: 'src/wordEntry/WordEntryTemplate.html'
  };
};

window.wordApp.directive('wordEntry', window.wordApp.wordEntry);
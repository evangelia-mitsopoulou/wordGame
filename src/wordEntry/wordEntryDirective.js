window.wordApp.wordEntry = function(){
	 return {
      restrict: 'AE',
      templateUrl: 'src/wordEntry/wordEntryTemplate.html'
  };
};

window.wordApp.directive('wordEntry', window.wordApp.wordEntry);
window.wordApp.wordEntry = function(){
	 return {
      restrict: 'AE',
      template: '<h3>Word Entry</h3>'
  };
};

//window.wordApp.wordEntry.$inject = ['$scope', 'WordsService'];
window.wordApp.directive('wordEntry', window.wordApp.wordEntry);
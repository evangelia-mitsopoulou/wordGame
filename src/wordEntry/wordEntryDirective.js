window.wordApp.wordEntry = function(){
	 return {
      restrict: 'AE',
      scope: false,
      template: '<h3>Word Entry</h3> <div> {{model.mangledWord}} Insert your name <div> <input type="text"></input>Type the correct word <div> <input type="text"></input>
  };
};

//window.wordApp.wordEntry.$inject = ['$scope', 'WordsService'];
window.wordApp.directive('wordEntry', window.wordApp.wordEntry);
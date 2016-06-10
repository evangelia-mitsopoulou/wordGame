window.wordApp.scoreList= function(){
	 return {
      restrict: 'AE',
      templateUrl: 'src/scoreList/scoresListTemplate.html'
  };
};

window.wordApp.directive('scoreList', window.wordApp.scoreList);
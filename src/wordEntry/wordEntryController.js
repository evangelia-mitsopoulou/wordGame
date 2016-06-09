 window.wordApp.wordEntryController = function($scope, WordsService,SaveScoreService,pubsub){
	$scope.model = {show : false};
  $scope.model.modal = false;
    
 function onTimeoutHandler(data){
    console.log('time out reacher', data);
    $scope.model.modal = true;
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
       var fortySeconds = 10,
       display = document.querySelector('#counter');
       SaveScoreService.StartTimer(fortySeconds, display);
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

	$scope.init = function(){
    $scope.previousLength = 0; 
    $scope.deleteCounter = 0;
		pubsub.addListener("firstMangledWord", $scope, onGetFirstMangledHandler);
    pubsub.addListener("timeout",$scope,onTimeoutHandler);
	};
   
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

window.wordApp.wordEntryController.$inject = ['$scope', 'WordsService', 'SaveScoreService','pubsubProvider'];
window.wordApp.controller('wordEntryController', window.wordApp.wordEntryController);
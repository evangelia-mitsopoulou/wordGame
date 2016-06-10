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

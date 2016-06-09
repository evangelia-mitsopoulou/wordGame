window.wordApp.SaveScoreService= function($http, config,pubsub){

  var _this = this;

  this.StartTimer = function(duration, display){
	   var timer = duration, minutes, seconds;
   			 setInterval(function () {
       		 minutes = parseInt(timer / 60, 10);
       		 seconds = parseInt(timer % 60, 10);
        	 minutes = minutes < 10 ? "0" + minutes : minutes;
        	 seconds = seconds < 10 ? "0" + seconds : seconds;
             display.textContent =  "00:" + seconds;
        if (--timer < 0) {
            timer = 0;
            pubsub.addObserver("timeout","test");
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
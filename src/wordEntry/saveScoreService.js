window.wordApp.SaveScoreService= function(){

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
       	 }
    	}, 1000);
       
  };
  
  this.calculateScore = function(){

  };


  this.submitScore = function(){

  };

};
//window.wordApp.WordsService.$inject = ['$http'];
window.wordApp.service('SaveScoreService', window.wordApp.SaveScoreService);
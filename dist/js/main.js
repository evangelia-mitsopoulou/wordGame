var wordApp = angular.module('wordGame',['ngRoute']);
 

wordApp.config(function($routeProvider){	
	$routeProvider
	.when('/', {
                templateUrl : 'src/home/homeView.html',
                controller  : 'homeController'
            })
	.when('/scores', {
                templateUrl : 'src/scoreList/scoresListView.html',
                controller  : 'scoresListController'
            })
	.when('/word-entry', {
                templateUrl : 'src/wordEntry/wordEntryView.html',
                controller  : 'wordEntryController'
            });
 });
window.wordApp.controller('homeController',['$scope', function($scope){

	$scope.start = function(){};


}]);

window.wordApp.controller('scoresListController',['$scope', function($scope){
	$scope.backToStart = function(){};
}]);


window.wordApp.controller('wordEntryController',['$scope', function($scope){
	$scope.submit = function(){};
}]);
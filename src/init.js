var wordApp = angular.module('wordGame',['ngRoute']);
 

wordApp.config(function($routeProvider){	
	$routeProvider
	.when('/', {
                templateUrl : 'src/index.html',
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
var wordApp = angular.module('wordGame',['angularModalService']);
 
wordApp.constant('Configuration', {
    WordsListUrl : 'https://brilliant-torch-9360.firebaseio.com/words.json',
    UsersUrl : 'https://brilliant-torch-9360.firebaseio.com/users.json'
});
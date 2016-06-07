
window.wordApp.pubsubProvider = function($rootScope){
    
    var observers = {};

    var listeners = {};

    var addObserver = function(eventName, item, e) {
        $rootScope.$broadcast(eventName, item  ? { item: item } : e);
        observers[eventName]= this.addObserver; 
    };

    var addListener = function(eventName,$scope, handler) {
        $scope.$on(eventName, function (e, args) {
            handler(args.item);
        });

      listeners["on"+eventName]= this.addListener; 
    };

    return { 
            observers: observers,
            listeners: listeners, 
            addObserver:addObserver, 
            addListener:addListener 
           };

};

window.wordApp.pubsubProvider.$inject = ['$rootScope'];
window.wordApp.factory("pubsubProvider", window.wordApp.pubsubProvider);

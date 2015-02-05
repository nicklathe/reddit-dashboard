var redditApp = angular.module('RedditApp',['ui.bootstrap']);

redditApp.run(function(){
    console.log('Running...');
});

redditApp.controller('RedditController', ['$scope','$http','$modal', function($scope, $http, $modal){
    $scope.searchTerm = '';
    $scope.posts = {};

    try {
        $scope.terms = JSON.parse(window.localStorage.terms) || [];
    } catch(e) {
        console.log('error', e);
        $scope.terms = [];
    }

    $scope.search = function(){

        var req = {
            url: 'http://www.reddit.com/search.json',
            params: {
                q: $scope.searchTerm
            }
        };

        $http(req).success(function(data){
            if($scope.terms.indexOf($scope.searchTerm) === -1){
                $scope.terms.unshift($scope.searchTerm);
                window.localStorage.terms = JSON.stringify($scope.terms);
            }
            $scope.posts = data.data.children;
        });
    };

    $scope.reSearch = function(idx){

        var req = {
            url: 'http://www.reddit.com/search.json',
            params: {
                q: $scope.terms[idx]
            }
        };

        $scope.searchTerm = $scope.terms[idx];

        $http(req).success(function(data){
            $scope.posts = data.data.children;
        });
    };

    $scope.delete = function(idx){
        $scope.terms.splice(idx, 1);
        window.localStorage.terms = JSON.stringify($scope.terms);

    };

    $scope.selected = function(idx){
        if($scope.terms[idx] == $scope.searchTerm){
            return true;
        } else {
            return false;
        }
    };

    $scope.hasPhoto = function(item) {
        if (item.data.thumbnail.length > 10 ) {
            return true;
        } else {
            return false;
        }
    };

// Modal below
    $scope.showAbout = function(){
        var aboutModal = $modal.open({
            templateUrl:'aboutModal.html',
            controller: 'AboutModalCtrl',
            size: "md"
        });
    };

}]);

// Modal controller
redditApp.controller('AboutModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
    $scope.greeting = "How are you? This is an about page"
    $scope.closeModal = function(){
        $modalInstance.close();
    };

}]);








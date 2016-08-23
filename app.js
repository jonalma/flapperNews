 //because we are adding an external module, we need to be sure to include it as a dependency in  our app ie. ui.router
var app = angular.module('flapperNews', ['ui.router']); //ui-router newer than ngRouter

app.factory('posts',[function(){
    var o = {
        posts: []
    }
    return o;
}])

app.controller('MainCtrl', ['$scope','posts',
    function($scope, posts) {
        $scope.posts = posts.posts
        
        $scope.test = 'Hello world!';
        
        $scope.posts = [{
            title: 'post 1',
            upvotes: 5
        }, {
            title: 'post 2',
            upvotes: 2
        }, {
            title: 'post 3',
            upvotes: 15
        }, {
            title: 'post 4',
            upvotes: 9
        }, {
            title: 'post 5',
            upvotes: 4
        }];
        
        $scope.addPost = function() {
            if(!$scope.title || $scope.title == '') {
                return;
            } else {
                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 0
                });
                $scope.title = "";
                $scope.link = "";
            }
        }//end addPOst
        
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        }
    }
]);


app.config(['$stateProvider','$urlRouterProvider',
           function($stateProvider, $urlRouterProvider){
               
               
               $stateProvider
                .state('home',{
                   url: '/home',
                   templateUrl: '/home.html',
                   controller: 'MainCtrl'
               });
               
               //use otherwise to redirect unspecified routes (if a url is undefined)
               $urlRouterProvider.otherwise('home');
               
           }])
 //because we are adding an external module, we need to be sure to include it as a dependency in  our app ie. ui.router
var app = angular.module('flapperNews', ['ui.router']); //ui-router newer than ngRouter

app.factory('posts',[
    function(){
        var o = {
            posts: []
        }
        return o;
}]);

app.controller('MainCtrl', ['$scope','posts',
    function($scope, posts) {
        $scope.posts = posts.posts;
        
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
        
        if(posts.posts.length == 0 || !posts.posts)
            angular.forEach($scope.posts, function(scopepost){
                posts.posts.push(scopepost);
            });
        
        $scope.addPost = function() {
            if(!$scope.title || $scope.title == '') {
                return;
            } 
            else {
                var newpost = {
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 0,
                    comments: [
                        {author: 'Joe', body: 'Cool post!', upvotes: 0},
                        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                    ]
                }
                
                $scope.posts.push(newpost);
                posts.posts.push(newpost);
                
                $scope.title = "";
                $scope.link = "";
            }
        };//end addPOst
        
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };
                  
    }
]);

app.controller('PostsCtrl', [ '$scope','$stateParams','posts',
    function($scope, $stateParams, posts){
        console.log(posts.posts)
        $scope.post = posts.posts[$stateParams.id]; //object that grabs posts from the 'posts' service using the id from $stateParams
        console.log(posts.posts[$stateParams.id]);
        
        $scope.addComment = function(){
            if($scope.body === '') { return; }
            
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }]);


app.config(['$stateProvider','$urlRouterProvider',
           function($stateProvider, $urlRouterProvider){
               
               
               $stateProvider
                .state('home',{
                   url: '/home',
                   templateUrl: '/home.html',
                   controller: 'MainCtrl'
               })
                       
                .state('posts',{
                   url: '/posts/{id}',  // id = route parameter that will be made available to our controller
                   templateUrl: '/posts.html',
                   controller: 'PostsCtrl'
               });
               
               //use otherwise to redirect unspecified routes (if a url is undefined)
               $urlRouterProvider.otherwise('home');
               
           }]);

(function () {

    var app = angular.module("starter.controllers");
    var DashCtrl = function ($scope,$interval,github,$location) {
        $scope.gitUser = {}
        $scope.message = "Hello Angular";
        var decrementCountdown=function(){
            $scope.countdown -=1;
            if($scope.countdown<1)
            {
                $scope.search();
            }
        };
        var countdownInterval=null;
        var stratCountdown=function () {
            $interval(decrementCountdown,1000,$scope.countdown)
        };
          $scope.search=function (){
           if(countdownInterval)
           {
              $interval.cancel(countdownInterval) ;
              $scope.countdown=null;
           }
           //$location.path("/user/"+$scope.username);

            //$scope.username=$routeParams.username;
            github.getUser($scope.gitUser.username).then(onUserComplete, onError);
        };
        $scope.countdown=8;
        stratCountdown();

         $scope.message = "Hello Angular";

        var onUserComplete = function (data) {
            $scope.user = data;
           github.getRepos($scope.user).then(fetchRepoInfo, onError);
        };

        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
        };

        var fetchRepoInfo=function(data) {
            $scope.repos=data;
        };
    };
    app.controller('DashCtrl', DashCtrl);
} ());
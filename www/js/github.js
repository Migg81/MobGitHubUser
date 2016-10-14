(function(){

    var github=function($http){

        var getUser=function(username){
           return $http.get("https://api.github.com/users/"+ username)
            .then(function(response) {
                return response.data;
            });
        };

        var getRepos=function(user){
           return $http.get(user.repos_url).then(function name(response) {
                return response.data;
            });
        };

        var gerRepoDetails=function(username,reposname) {
            var repo;
            var repoUrl="https://api.github.com/repos/"+username+"/"+ reposname;           
            return $http.get(repoUrl)
            .then(onContributors).then(fetchContributorInfo);
        };

        var onContributors = function (response) {
            repo = response.data;
            return $http.get(response.data.contributors_url)
        };

        var fetchContributorInfo=function(responce){
            repo.contributors=responce.data;
            return repo;
        };

        return {
            getUser:getUser,
            getRepos:getRepos,
            gerRepoDetails:gerRepoDetails
        };
    };

    var module=angular.module("starter.services");
    module.factory("github",github);
}());
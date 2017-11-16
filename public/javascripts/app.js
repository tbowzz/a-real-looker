angular.module('face', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){

    $scope.faces = [];

    $scope.addFace = function() {
      var newface = {image:$scope.imageContent,rating:0,total:0,votes:0};
      $scope.imageContent='';
      $http.post('/faces', newface).success(function(data){
        $scope.faces.push(data);
      });
    };

    $scope.vote = function(face) {
      var newrating = $scope.ratingContent;
      if(!$scope.ratingContent) newrating = 50;
      console.log("rating:" + newrating / 10);
      $scope.ratingContent='';
      return $http.post('/vote/' + face._id, {rating:newrating})
        .success(function(data){
          face.rating = data.rating;
        });
    };

    $scope.addRating = function(face) {
      $scope.vote(face);
      };

    $scope.delete = function(face) {
      $http.delete('/faces/' + face._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

    $scope.getAll = function() {
      return $http.get('/faces').success(function(data){
        angular.copy(data, $scope.faces);
      });
    };
    $scope.getAll();
  }
]);
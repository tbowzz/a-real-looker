angular.module('face', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){

    $scope.faces = [];

    $scope.addFace = function() {
      var newface = {image:$scope.formContent,rating:0};
      $scope.formContent='';
      $http.post('/faces', newface).success(function(data){
        $scope.faces.push(data);
      });
    };

    $scope.vote = function(face) {
      return $http.put('/faces/' + face._id + '/vote')
        .success(function(data){
          console.log("vote worked");
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
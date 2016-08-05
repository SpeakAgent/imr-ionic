mainApp.controller('HelpCtrl', function($scope, $cordovaMedia, $ionicLoading, $http) {
  console.log("Help Words");

  var req = {
    url: 'https://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST'
  }

  $http(req).success(function(data){
    $scope.user = data
  })

  // make sure your the code gets executed only after `deviceready`.
  document.addEventListener('deviceready', function () {
    $scope.speak = function() {
      console.log("Yes");
      TTS.speak({
        text: "I am hurt",
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }
  }, false);
})

mainApp.controller('LoginCtrl', function($scope, $aside, $ionicModal, LoginService, $ionicPopup, $state, $window) {
  $scope.data = {};

  $scope.userError = false;
  $scope.passError = false;

  $scope.sign = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password)
    .success(function(data) {
      $window.location.reload(true);
      $state.go('tab.home');
    }).error(function(data) {
      $scope.userError = true;
      $scope.passError = true;
    });
  }

  $scope.login = function () {
    $scope.asideInstance = $aside.open({
      placement: 'bottom',
      animation: true,
      size: 'lg',
      templateUrl: 'templates/include/login.html',
      scope: $scope,
    });

    $scope.asideClose = function() {
      $scope.asideInstance.close();
    }
  };

  $ionicModal.fromTemplateUrl('templates/include/forgot.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.forgot = modal;
  });

  $scope.openModal = function() {
    $scope.forgot.show();
  };

  $scope.closeModal = function() {
    $scope.forgot.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.forgot.remove();
  });
})

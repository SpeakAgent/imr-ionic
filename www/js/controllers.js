angular.module('starter.controllers', ['ngMaterial', 'ngCordova'])

.controller('HomeCtrl', function($scope) {
  $scope.today = new Date();
})

.controller('TimeCtrl', function($scope){
  var h = new Date().getHours();
  if (h >= 6 && h < 12) {
    $scope.time="morning"
    $scope.timeBox="morningBox"
  }
  else if (h >= 12 && h <= 18) {
    $scope.time="afternoon";
    $scope.timeBox="afternoonBox";
  } else {
    $scope.time="night";
    $scope.timeBox="nightBox";
  }
  console.log(h);
  console.log($scope.time);
})

.controller('ScheduleCtrl', function($scope) {

})

.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('HelpCtrl', function($scope, $cordovaMedia, $ionicLoading) {

    $scope.play = function(src) {
        var media = new Media(src, null, null, mediaStatusCallback);
        $cordovaMedia.play(media);
    }

    var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
        }
    }

});

.controller('EmergencyCtrl', function(){

})

.controller('PanelController', function($scope, $ionicPopover){
  this.tab = 1;
  this.selectTab = function(setTab) {
    this.tab = setTab;
  };
  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  }

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });
})


.controller('TaskViewController', function($scope, $ionicPopover, $ionicHistory){
  this.tab = 1;
  this.selectTab = function(setTab) {
    this.tab = setTab;
  };
  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  }

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
});

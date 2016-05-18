angular.module('starter.controllers', ['ngMaterial', 'ngCordova'])

.controller('HomeCtrl', function($scope) {
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
})

.controller('TimeCtrl', function($scope){
  var h = new Date().getHours();
  if (h >= 6 && h < 12) {
    $scope.time="morning"
    $scope.timeBox="morningBox"
    $scope.timeHeader="morningHeader";
  }
  else if (h >= 12 && h <= 18) {
    $scope.time="afternoon";
    $scope.timeBox="afternoonBox";
    $scope.timeHeader="afternoonHeader";
  } else {
    $scope.time="night";
    $scope.timeBox="nightBox";
    $scope.timeHeader="nightHeader";
  }
  console.log(h);
  console.log($scope.time);
})

.controller('ScheduleCtrl', function($scope) {
  $scope.getTod = true;
  $scope.getTomo = false;
  $scope.showWk = false;
  $scope.showToday = true;

  $scope.getTom = function () {
    $scope.getTod = false;
    $scope.getTomo = true;
  }

  $scope.getTodBack = function () {
    $scope.getTod = true;
    $scope.getTomo = false;
  }

  $scope.showWeek = function () {
    $scope.showWk = true;
    $scope.showToday = false;
  }

  $scope.showDay = function () {
    $scope.showWk = false;
    $scope.showToday = true;
  }

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
})

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

  $scope.done = false;
  $scope.doneTask = function() {
    $scope.done = true;
  };

});

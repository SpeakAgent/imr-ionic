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

  $scope.currentWeek = true;
  $scope.nextWeek = false;

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

  $scope.getNext = function () {
    $scope.currentWeek = false;
    $scope.nextWeek = true;
  }

  $scope.getNextBack = function () {
    $scope.currentWeek = true;
    $scope.nextWeek = false;
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

.controller('PanelController', function ($scope, $ionicPopover, taskService) {
  this.tab = 1;
  this.selectTab = function(setTab) {
    this.tab = setTab;
  };
  this.isSelected = function(checkTab) {
    if (this.tab === checkTab) {
      var taskMessage = taskService.getMessages();
      if (taskMessage != null & taskMessage.length > 0) {
        $scope.isSuccessPushMess = taskMessage[0].status == 'done';
      }
      return true;
    }
    return false;
  }

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });
})


.controller('TaskViewController', function ($scope, $ionicPopover, $ionicHistory, taskService) {
  this.tab = 1;

  this.selectTab = function(setTab) {
    this.tab = setTab;
  };

  this.isSelected = function (checkTab) {
    //return this.tab === checkTab;
    if (this.tab === checkTab) {
      var stepStatus = taskService.getStepStatus();
      $scope.done1 = stepStatus.isStep1Done;
      $scope.done2 = stepStatus.isStep2Done;
      return true;
    }
    return false;
  }

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  //Fixed for All Steps
  $scope.doneTask1 = function () {
    $scope.done1 = true;
    taskService.setStepStatus($scope.done1, $scope.done2);
  };

  //$scope.done2 = false;
  $scope.doneTask2 = function () {
    $scope.done2 = true;
    taskService.setStepStatus($scope.done1, $scope.done2);
    taskService.addMessage({ 'status': 'done' })
  };

  //Text to Speech
  $scope.data = {
    speechText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
  // make sure your the code gets executed only after `deviceready`.
  document.addEventListener('deviceready', function () {
    $scope.speakText = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.speechText,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }
  }, false);
});

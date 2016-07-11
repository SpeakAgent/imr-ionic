var mainApp = angular.module('starter.controllers', ['ngMaterial', 'ngCordova'])

.controller('HomeCtrl', function($scope, $interval) {
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);

  $scope.time = '';
  $scope.timeMorning = false;
  $scope.timeAfternoon = false;
  $scope.timeNight = false;

  $scope.hora = $scope.today.getHours();

  var init = init;
  var monitorHoras = monitorHoras;
  var resetTimes = resetTimes;

  init();
  monitorHoras();

  function init(){
    if ($scope.hora >= 6 && $scope.hora < 12) {
      $scope.timeMorning = true;
      $scope.time="morning";
      console.log('set morning');
    }
    else if ($scope.hora >= 12 && $scope.hora <= 18) {
      $scope.timeAfternoon = true;
      $scope.time="afternoon";
      console.log('set afternoon');
    } else {
      $scope.timeNight = true;
      $scope.time="night";
      console.log('set night');
    }
  }

  function monitorHoras(){
    $interval(function (){
      var newHour = new Date().getHours();
      if(newHour != $scope.hora){
        $scope.hora = newHour;
        resetTimes();
        init();
      }
    }, 5000);
  }

  function resetTimes(){
    $scope.timeMorning = false;
    $scope.timeAfternoon = false;
    $scope.timeNight = false;
  }

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


.controller('TaskViewController', function ($scope, $ionicPopover, $ionicHistory, taskService, $ionicModal) {
  this.tab = 1;
  $scope.done1 = false;
  $scope.done2 = false;

  $ionicModal.fromTemplateUrl('templates/include/task_help.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.modalGetHelpWithTask = modal;
    console.log('Modal: ', modal);
  });

  $scope.openModal = function() {
      $scope.modalGetHelpWithTask.show();
  };

  $scope.closeModal = function() {
      $scope.modalGetHelpWithTask.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.modalGetHelpWithTask.remove();
  });


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
    $scope.done1 = !$scope.done1;
    taskService.setStepStatus($scope.done1, $scope.done2);
  };

  //$scope.done2 = false;
  $scope.doneTask2 = function () {
    $scope.done2 = !$scope.done2;
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

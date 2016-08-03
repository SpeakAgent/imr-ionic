var mainApp = angular.module('starter.controllers', ['ngMaterial', 'ngCordova'])

.controller('HomeCtrl', function($scope, $http) {
  $scope.monthNames = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  if (!$scope.targetDate) {
    $scope.today = new Date();
    $scope.target = $scope.today
    $scope.tomorrow = new Date();
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
    console.log("Getting target date first")
    var m = $scope.today.getMonth() + 1;
    $scope.targetDate = $scope.today.getFullYear() + '-' + m + '-' + $scope.today.getDate();
    $scope.targetDay = $scope.today.getDate();
    $scope.targetMonth = $scope.monthNames[m.toString()];
    var req = {
      url: 'https://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: 'POST'
    }

    $http(req).success(function(data){
      $scope.events = data;
    })
  } else {
    var req = {
      url: 'https://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: 'POST'
    }

    $http(req).success(function(data){
      $scope.events = data;
    })
  }

  $scope.changeDate = function(n) {
    console.log("Calling change Date")
    $scope.events = {};
    // Get vals for current date
    var v = $scope.targetDate.split('-');
    var d = parseInt(v[2]) + n;
    $scope.targetDate = v[0] + "-" + v[1] + "-" + d;
    $scope.targetDay = d.toString();
    $scope.targetMonth = $scope.monthNames[v[1]];
    console.log($scope.targetDay)
    var req = {
      url: 'https://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: 'POST'
    }

    $http(req).success(function(data){
      $scope.events = data;
    })
  }

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

.controller('TimeCtrl', function($scope, $http){
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

.controller('ProfileCtrl', function($scope, $http) {
  $scope.settings = {
    enableFriends: true
  };

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


})

<<<<<<< HEAD
.controller('EmergencyCtrl', function(){
=======

.controller('HelpCtrl', function($scope, $cordovaMedia, $ionicLoading, $http) {

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

.controller('EmergencyCtrl', function($scope, $http){
  var req = {
    url: 'https://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST'
  }
>>>>>>> 1f77a6a1a4666ecd55507455f690a1723d1bcd0e

  $http(req).success(function(data){
    $scope.user = data
  })
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


<<<<<<< HEAD
.controller('TaskViewController', function ($scope, $ionicPopover, $ionicHistory, taskService, $ionicModal) {
=======
.controller('TaskViewController', function ($scope, $ionicPopover, $ionicHistory, taskService, $http) {
>>>>>>> 1f77a6a1a4666ecd55507455f690a1723d1bcd0e
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

  var req = {
    url: 'https://iamready.herokuapp.com/events/one/',
    data: {
      pk: 1,
      date: "2016-07-19"
    },
    method: "POST"
  }

  $http(req).success(function(data){
    $scope.task = data;
  })

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

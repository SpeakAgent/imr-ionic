var mainApp = angular.module('starter.controllers', ['ngMaterial', 'ngCordova', 'ui.bootstrap', 'ngAside'])

.controller('HomeCtrl', function($scope, $http, $interval, $filter, $window) {
  $scope.today = new Date();

  console.log($scope.today);

  $scope.time = '';
  $scope.timeMorning = false;
  $scope.timeAfternoon = false;
  $scope.timeNight = false;

  $scope.hour = $scope.today.getHours();

  var init = init;
  var monitorhours = monitorhours;
  var resetTimes = resetTimes;

  init();
  monitorhours();

  function init(){
    if ($scope.hour >= 6 && $scope.hour < 12) {
      $scope.timeMorning = true;
      $scope.time="morning";
      console.log('set morning');
    }
    else if ($scope.hour >= 12 && $scope.hour <= 18) {
      $scope.timeAfternoon = true;
      $scope.time="afternoon";
      console.log('set afternoon');
    } else {
      $scope.timeNight = true;
      $scope.time="night";
      console.log('set night');
    }
  }

  $scope.doRefresh = function() {
    $window.location.reload();
    console.log($scope.today);
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }

  $scope.setTimes = function() {
    ['morning', 'afternoon', 'evening'].forEach(function(tod){
      console.log(tod, $scope.events[tod])
      for (var i in $scope.events[tod]) {
        // This SHOULD use JS's Date, but for some reason
        // we keep getting strings back.
        console.log($scope.events[tod][i].start_time)
        var v = $scope.events[tod][i].start_time.split(":")
        if (parseInt(v[0]) > 12) {
          h = String(parseInt(v[0]) - 12);
          ap = "PM"
        } else {
          h = String(parseInt(v[0]))
          ap = "AM"
        }
        $scope.events[tod][i].start_time = h + ":" + v[1] + " " + ap;

        var v = $scope.events[tod][i].end_time.split(":")
        if (parseInt(v[0]) > 12) {
          h = String(parseInt(v[0]) - 12);
          ap = "PM"
        } else {
          h = String(parseInt(v[0]));
          ap = "AM"
        }
        $scope.events[tod][i].end_time = h + ":" + v[1] + " " + ap;
      }
    })
  }

  function monitorhours(){
    $interval(function (){
      var newHour = new Date().getHours();
      if(newHour != $scope.hour){
        $scope.hour = newHour;
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

  $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday']

    if ($scope.targetDate == $scope.currentDate ) {
      $scope.yesToday = true;
    }

  if (!$scope.targetDate) {
    $scope.today = new Date();
    $scope.target = new Date();
    $scope.tomorrow = new Date();
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
    console.log("Getting target date first")
    var m = $scope.today.getMonth() + 1;
    $scope.targetDate = $scope.today.getFullYear() + '-' + m + '-' + $scope.today.getDate();
    $scope.targetDay = $scope.today.getDate();
    $scope.targetMonth = $scope.monthNames[m.toString()];
    $scope.targetYear = $scope.today.getFullYear();

    var req = {
      url: 'http://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: localStorage.getItem('pk'),
        date: $scope.targetDate
      },
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(req).success(function(data){
      $scope.events = data;
      $scope.setTimes();
    }).error(function(data) {
      console.log(data)
    })

    var wreq = {
      url: 'http://iamready.herokuapp.com/events/all/week/',
      data: {
        user_pk: localStorage.getItem('pk'),
        date: $scope.targetDate
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    console.log(wreq);

    $http(wreq).success(function(data) {
      $scope.week = data;
      console.log($scope.week)
    })
  } else {
    var req = {
      url: 'http://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: localStorage.getItem('pk'),
        date: $scope.targetDate
      },
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(req).success(function(data){
      $scope.events = data;
      $scope.setTimes();
    })

    var wreq = {
      url: 'http://iamready.herokuapp.com/events/all/week/',
      data: {
        user_pk: localStorage.getItem('pk'),
        date: $scope.targetDate
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    console.log(wreq)

    $http(wreq).success(function(data) {
      $scope.week = data;
    })
  }

  $scope.compareDates = function(d1, d2) {
    console.log(d1.getDate(), d2.getDate())
    if (d1.getDate() == d2.getDate() &&
      d1.getMonth() == d2.getMonth() &&
        d1.getYear() == d2.getYear()) {
      return true
    } else {
      return false
    }
  }

  $scope.changeDate = function(n) {
    console.log("Calling change Date")
    $scope.events = {};
    // Get vals for current date
    $scope.target.setDate($scope.target.getDate() + n);

    $scope.yesToday = $scope.compareDates($scope.target, $scope.today)

    $scope.targetDate = $scope.target.getFullYear() + '-' + ($scope.target.getMonth() + 1) + '-' + $scope.target.getDate();

    var req = {
      url: 'http://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: localStorage.getItem('pk'),
        date: $scope.targetDate
      },
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(req).success(function(data){
      $scope.events = data;
      $scope.setTimes();
    })
  }

  $scope.changeWeek = function(n) {
    $scope.week = {}
    console.log("Calling change week");
    $scope.events = {};
    $scope.target.setDate($scope.target.getDate() + n);
    $scope.targetDate = $scope.target.getFullYear() + '-' + ($scope.target.getMonth() + 1) + '-' + $scope.target.getDate();

    var wreq = {
      url: 'http://iamready.herokuapp.com/events/all/week/',
      data: {
        user_pk: localStorage.getItem('pk'),
        date: $scope.targetDate
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    console.log(wreq);

    $http(wreq).success(function(data) {
      $scope.week = data;
    })
  }
})

.controller('TimeCtrl', function($scope, $http, $filter){
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

  var nreq = {
        url: "http://iamready.herokuapp.com/events/task/next/",
        data: {
            pk: localStorage.getItem('pk'),
        },
        method: "POST",
        headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    console.log("Next,", nreq)

    $http(nreq).success(function(data) {
        $scope.nextEvent = data;
        console.log("Next data",data);
        var start = toTime(data.start_time);
        var end = toTime(data.end_time);
        data.start_time = start;
        data.end_time = end;
    });

    function toTime(timeString) {
      var timeTokens = timeString.split(':');
      return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
    }

    $scope.doRefresh = function() {
      $window.location.reload();
      console.log($scope.today);
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
    }
})

.controller('ScheduleCtrl', function($scope) {
  $scope.getTod = true;
  $scope.getTomo = false;
  $scope.showWk = false;
  $scope.showToday = true;

  $scope.currentWeek = true;
  $scope.nextWeek = false;
})

.controller('ProfileCtrl', function($scope, $http, $window) {
  var req = {
    url: 'http://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST',
    headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
  }

  $http(req).success(function(data){
    $scope.user = data
  })

  $scope.doRefresh = function() {
    $window.location.reload();
    console.log($scope.today);
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }

})


.controller('HelpCtrl', function($scope, $cordovaMedia, $ionicLoading, $http, $window) {

  var req = {
    url: 'http://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST',
    headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
  }

  $http(req).success(function(data){
    $scope.user = data
  })

  // TTS For Help Words.
  $scope.sayPhrase = function (index) {
    var tts_req = {
      url: 'http://iamready.herokuapp.com/users/user/one/',
      data: {
        pk: 1
      },
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(tts_req).success(function(data){
      $scope.user = data
      var tts = $scope.user.phrases[index].text;
      $scope.speakText(tts);
    })
  }

    $scope.speakText = function(text) {
      TTS.speak({
        text: text,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.doRefresh = function() {
      $window.location.reload();
      console.log($scope.today);
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply()
    }
})

.controller('EmergencyCtrl', function($scope, $http, $window){
  var req = {
    url: 'http://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST',
    headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
  }

  $http(req).success(function(data){
    $scope.user = data
  })

  $scope.doRefresh = function() {
    $window.location.reload();
    console.log($scope.today);
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }

})

.controller('PanelController', function ($scope, $ionicPopover, taskService, $window) {
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

  $scope.doRefresh = function() {
    $window.location.reload();
    console.log($scope.today);
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }

})

.controller('TaskViewController', function ($scope, $ionicPopover, $ionicHistory, taskService, $http, $stateParams, $ionicModal) {
  this.tab = 1;
  $scope.done = false;

  $ionicModal.fromTemplateUrl('templates/include/task_help.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.modalGetHelpWithTask = modal;
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
    return this.tab === checkTab;
  }

  $scope.stepNum = 0;

  var req = {
    url: 'http://iamready.herokuapp.com/events/task/one/',
    data: {
      pk: $stateParams.pk,
      date: $stateParams.targetDate
    },
    method: "POST",
    headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
  }

  console.log(req)

  $http(req).success(function(data){
    $scope.task = data;
    $scope.maxStepNum = $scope.task.steps.length - 1;
  })

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  //Fixed for All Steps
  $scope.doneStep = function (pk, stepNum) {
    var sreq = {
      url: "http://iamready.herokuapp.com/events/step/update/",
      data: {
        task_pk: $scope.task.pk,
        step_pk: pk,
        date: $stateParams.targetDate
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    console.log(sreq);

    $http(sreq).success(function(data){
      $scope.task.steps[stepNum].status = "done";
    })
    .error(function(data) {
      console.log(data)
    })
  };


  $scope.undoStep = function (pk, stepNum) {
    var ureq = {
      url: "http://iamready.herokuapp.com/events/step/update/",
      data: {
        task_pk: $scope.task.pk,
        step_pk: pk
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(ureq).success(function(data){
      $scope.task.steps[stepNum].status = "not_started";
    })
  };

  $scope.speakText = function(text) {
      TTS.speak({
        text: text,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

  //TTS For Single Steps.
  $scope.saySingle = function (text) {
    var tts_req = {
      url: 'http://iamready.herokuapp.com/events/task/one/',
      data: {
        pk: $stateParams.pk,
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(tts_req).success(function(data){
      $scope.task = data;
      var tts = $scope.task.steps[index].title;
      $scope.speakText(tts);
    })
  }

  // TTS For All Steps.
  $scope.sayAll = function (index) {
    console.log(index);
    var tts_req = {
      url: 'http://iamready.herokuapp.com/events/task/one/',
      data: {
        pk: $stateParams.pk,
      },
      method: "POST",
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    console.log(tts_req);

    $http(tts_req).success(function(data){
      $scope.task = data;
      var tts = $scope.task.steps[index].title;
      $scope.speakText(tts);
    })
  }

  $scope.speakText = function(text) {
    console.log("Yes");
    TTS.speak({
      text: text,
      locale: 'en-US',
      rate: 1.5
    }, function () {
      console.log("SPEAK!!!");
    });
  }

  $scope.doRefresh = function() {
    $window.location.reload();
    console.log($scope.today);
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }
});

mainApp.controller('HelpCtrl', function($scope, $cordovaMedia, $ionicLoading) {
  console.log("Help Words");

  //Text to Speech
  $scope.data = {
    lost: 'I am lost.',
    sick: 'I am sick.',
    hurt: 'I am hurt.',
    help: 'I need help.',
    bathroom: 'Where is the bathroom?',
    doThis: 'How can I do this?',
    helpMe: 'Who can help me?',
    nextStep: 'What is the next step?',
    finished: 'When am I finished?'
  };

  // make sure your the code gets executed only after `deviceready`.
  document.addEventListener('deviceready', function () {
    $scope.speakLost = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.lost,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakSick = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.sick,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakHurt = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.hurt,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakHelp = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.help,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakBathroom = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.bathroom,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakDoThis = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.doThis,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakHelpMe = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.helpMe,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakNextStep = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.nextStep,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }

    $scope.speakFinished = function() {
      console.log("Yes");
      TTS.speak({
        text: $scope.data.finished,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }
  }, false);
})

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'vAccordion', 'angularMoment'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.schedule', {
    url: '/schedule',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/tab-schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  })

  .state('morning-task-view', {
    url: '/morning/task-view',
    templateUrl: 'templates/morning/task-view.html',
    controller: 'TaskViewController'
  })

  .state('morning-next-step', {
    url: '/morning/next-step',
    templateUrl: 'templates/morning/next-step.html',
    controller: ''
  })

  .state('afternoon-task-view', {
    url: '/afternoon/task-view',
    templateUrl: 'templates/afternoon/task-view.html',
    controller: 'TaskViewController'
  })

  .state('afternoon-next-step', {
    url: '/afternoon/next-step',
    templateUrl: 'templates/afternoon/next-step.html',
    controller: ''
  })

  .state('night-task-view', {
    url: '/night/task-view',
    templateUrl: 'templates/night/task-view.html',
    controller: 'TaskViewController'
  })

  .state('night-next-step', {
    url: '/night/next-step',
    templateUrl: 'templates/night/next-step.html',
    controller: ''
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.help', {
    url: '/help',
    views: {
      'tab-help': {
        templateUrl: 'templates/tab-help.html',
        controller: 'HelpCtrl'
      }
    }
  })

  .state('tab.emergency', {
    url: '/emergency',
    views: {
      'tab-emergency': {
        templateUrl: 'templates/tab-emergency.html',
        controller: 'EmergencyCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/home');

});

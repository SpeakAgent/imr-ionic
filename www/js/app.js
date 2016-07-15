angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'vAccordion', 'angularMoment', 'ngCordova', 'ui.router', 'uiRouterStyles', 'ui.bootstrap', 'ngAside'])

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

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    data: {
      css: 'css/login.css'
    }
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    cache: false,
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

  .state('tab.morning-task-view', {
    url: '/morning-task-view',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/morning/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.morning-next-step', {
    url: '/morning-next-step',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/morning/next-step.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.transit-task-view', {
    url: '/transit-task-view',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/transit/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.transit-next-step', {
    url: '/transit-next-step',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/transit/next-step.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.afternoon-task-view', {
    url: '/afternoon-task-view',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/afternoon/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.afternoon-next-step', {
    url: '/afternoon-next-step',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/afternoon/next-step.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.night-task-view', {
    url: '/night-task-view',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/night/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.night-next-step', {
    url: '/night-next-step',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/night/next-step.html',
        controller: 'TaskViewController'
      }
    }
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

  $urlRouterProvider.otherwise('/login');

});

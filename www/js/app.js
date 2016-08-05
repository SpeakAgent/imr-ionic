angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'vAccordion', 'angularMoment', 'ngCordova'])

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

  .state('tab.morning-task-view', {
    url: '/task-view',
    views: {
      'tab-home': {
        templateUrl: 'templates/morning/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.morning-next-step', {
    url: '/morning-next-step',
    views: {
      'tab-home': {
        templateUrl: 'templates/morning/next-step.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.transit-task-view', {
    url: '/transit-task-view',
    views: {
      'tab-home': {
        templateUrl: 'templates/transit/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.transit-next-step', {
    url: '/transit-next-step',
    views: {
      'tab-home': {
        templateUrl: 'templates/transit/next-step.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.afternoon-task-view', {
    url: '/afternoon-task-view',
    views: {
      'tab-home': {
        templateUrl: 'templates/afternoon/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.afternoon-next-step', {
    url: '/afternoon-next-step',
    views: {
      'tab-home': {
        templateUrl: 'templates/afternoon/next-step.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.night-task-view', {
    url: '/night-task-view',
    views: {
      'tab-home': {
        templateUrl: 'templates/night/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.night-next-step', {
    url: '/night-next-step',
    views: {
      'tab-home': {
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

  $urlRouterProvider.otherwise('/tab/home');

});

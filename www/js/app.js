
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

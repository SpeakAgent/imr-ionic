angular.module('starter.services', [])

.factory('Chats', function () {

  return {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('taskService', function () {
  var messageList = [];
  var stepStatus = {};
  stepStatus.isStep1Done = false;
  stepStatus.isStep2Done = false;


  var addMessage = function (newObj) {
    messageList.push(newObj);
  };

  var getMessages = function () {
    return messageList;
  };

  var setStepStatus = function (isStep1Done, isStep2Done) {
    stepStatus.isStep1Done = isStep1Done;
    stepStatus.isStep2Done = isStep2Done;
  }

  var getStepStatus = function () {
    return stepStatus;
  }

  return {
    addMessage: addMessage,
    getMessages: getMessages,
    setStepStatus: setStepStatus,
    getStepStatus: getStepStatus
  };
})

.service('LoginService', function($q) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (name == 'ben' && pw == 'secret') {
        deferred.resolve('Welcome ' + name + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

angular.module('starter.services', [])

.factory('Chats', function() {

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
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

    var addMessage = function (newObj) {
        messageList.push(newObj);
    };

    var getMessages = function () {
        return messageList;
    };

    return {
        addMessage: addMessage,
        getMessages: getMessages
    };

});

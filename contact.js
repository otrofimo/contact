var Rooms = new Meteor.Collection("rooms");
var Messages = new Meteor.Collection("messages");


if (Meteor.is_client) {
  Meteor.startup(function() {
    Meteor.subscribe("allrooms"); 
    Meteor.subscribe("allmessages");

  });

  Template.main.currentRoom = function() {
    return Session.get("room") || false;
  };

  Template.rooms.availableRooms = function () {
    return Rooms.find({});
  };

  Template.rooms.events = {
    "submit": function () {
      var roomName = $('#roomName').val();
      $('#roomName').val('');
      if(roomName != '') {
        Rooms.insert({name: roomName });
      }
    }
  };


  Template.roomItem.events = {
    "click a.enter": function () {
      if(Session.get("name") === undefined) {
        var d = "Guest" + Math.floor(Math.random()*999);
        var name = window.prompt("Name:", d);
        if(name === "") name = d; 
        Session.set("name", name);
      }
      Session.set("room", this._id);
    }
  };

  Template.roomItem.numPlayers = function() {
    var room = Rooms.findOne(this._id);
    return room.players ? room.players : 0;
  };

  Template.room.events = {
    "mousemove .gameBoard": function(e) {
      var theRoom = Rooms.findOne(Session.get("room"));
      var trueX = e.pageX - parseInt($('.gameBoard').css('margin-left'));
      Session.set("dx", (trueX - Session.get("posX"))/10);
      Session.set("dy", ((e.pageY - 50) - Session.get("posY"))/10);
    },
    "click #leave": function() {
      var theRoom = Rooms.findOne(Session.get("room"));
      Rooms.update(theRoom._id, {$set: {players: 0}});
      Session.set("room", undefined);
      Meteor.flush();
    },
    "submit": function() {
      Messages.insert({ 
        room: Session.get("room"), 
        author: Session.get("name"), 
        text: $('#messageInput').val()
      });
      $('#messageInput').val('');
    }
  };

  Template.room.roomName = function() {
    var room = Rooms.findOne(Session.get("room"));
    return room && room.name;
  };

  Template.room.messages = function() {
    return Messages.find({room: Session.get("room")});
  };

//   Template.hello.events = {
//     'click input' : function () {
//       // template data, if any, is available in 'this'
//       if (typeof console !== 'undefined')
//         console.log("You pressed the button");
//     }
//   };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    //CLEAR ALL ROOMS AND MESSAGES
    //Rooms.remove({});
    //Messages.remove({});
    //PUBLISH COLLECTIONS
    Meteor.publish("allrooms", function() {
      return Rooms.find({});
    });
    Meteor.publish("allmessages", function() {
      return Messages.find({});
    });
  
  clearMessages: function() {
        Messages.remove({});
      }
    });
}

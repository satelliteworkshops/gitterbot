"use strict";

// the users input is scanned for these keywords
// and can trigger the messages below
// chance controls the frequency the result will be echoed back by the camper

// using js rather than json so we can have functions and comments

var Utils = require('../../lib/utils/Utils');
var BotCommands = require('../../lib/bot/BotCommands');
var _ = require('lodash-node');

var date = new Date();
var dateAsString = date.toString();


// TODO - add these to all of the rooms
// this is easier for people to add content to as they don't have to add to two lists
var AllRoomMessages = [
    {
        regex: /satellite/gim,
        text: " > GitHub is great, and Training Day is greater!!",
    },
  
    {
        regex: /USERNAME/gim,
        text: " > That person is awesome",
    },
    {
        regex: /fruit/gim,
        text: " > My favorites are apples and grapes.",
    },
    {
        regex: /Please +tell +me +the +time/gim,
        text: dateAsString,
    },
    {
        regex: /movie/gim,
        text: " > My favorite movie is The Wizard of Oz",
    },
    {
        regex: /lunch/gim,
        text: " > I want a peanut butter and jelly sandwich for lunch today.",
    },

    {
        regex: /botx/i,
        text: "> you called?"
    },

    {
        regex: /\btroll\b/i,
        text: "> :trollface: troll problems? [notify admins here](https://gitter.im/camperbot/admins)"
    },
    {
        regex: /allyourbase/,
        text: "![all your base](https://files.gitter.im/FreeCodeCamp/CoreTeam/Bw51/imgres.jpg)"
    },
    {
        regex: /'''/,
        text: "> :bulb: to format code use backticks! ``` [more info](https://github.com/freecodecamp/freecodecamp/wiki/code-formatting)"
    },
    {
        regex: /\bth?a?n?[xk]s?q?\b/gim,
        func: BotCommands.thanks
    }
];

var RoomMessages = {

    scanInput: function(input, roomName, chance) {
        if (Math.random() > chance) {
            return null;   // dont always reply
        }
        var oneMessage;
        var chat = input.message.model.text.toLowerCase();
        chance = chance || 1;
        roomName = roomName.toLowerCase();

        // some messages are only for certain rooms so exclude them here
        var thisRoomMessages = AllRoomMessages.filter(function(msg) {
            if (msg.not) {
                return (msg.not != roomName);
            } else {
                return true;
            }
        });
        if (!thisRoomMessages) { return false; }

        var msgList = thisRoomMessages.filter(function(item) {
            if(!item) { return null; }

            if (item.regex) {
              var flag = item.regex.test(chat);
            }

            if(flag) {
                //Utils.clog(chat, item.word, "flag:" + flag);
            }
            return flag;
        });

        // now check if chance is high enough
        if (msgList.length > 0) {

            oneMessage = _.sample(msgList);  // if we have multiple messages, make sure to choose just one
            chance = oneMessage.chance || 1; // check if the chance is high enough so we can have % of time messages
            if (Math.random() < (chance)) {
                // we have a winner!
                return oneMessage;
            }
        } else {
            return null;
        }

    }

};

module.exports = RoomMessages;

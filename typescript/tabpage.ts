/// <reference path="../typings/chrome/chrome.d.ts"/>
/// <reference path="messaging.ts"/>
/// <reference path="popup.ts"/>
'use strict';

var message = new Messaging();
message.CreateListener();
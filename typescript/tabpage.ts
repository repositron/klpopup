/// <reference path="../typings/chrome/chrome.d.ts"/>
/// <reference path="messaging.ts"/>
/// <reference path="popup.ts"/>
/// <reference path="mousecap.ts"/>
'use strict';
console.log("tabpage.ts starting")
var messaging = new Messaging();
messaging.CreateListener();
var p = new Popup.Popup((nextfn : Function) => {});


var txtnode = window.document.createTextNode("This is text that was constructed dynamically with createElementNS and createTextNode then inserted into the document using appendChild.");
p.Display(txtnode);
messaging.Subscribe("ReceivedListening", (() => {console.log("tab received ReceivedListening")}));
messaging.Subscribe("Clr", () => p.Clear);
messaging.Subscribe("ReceivedInitDone", () => {
    console.log("rec ReceivedInitDone");
    messaging.SendInitiated();
    /*chrome.tabs.getCurrent(function(tab) {
     this.tab_ = tab;*/
});

var mouse = new mousecap.MouseFnImpl();
mousecap.CaptureMouse(mouse);

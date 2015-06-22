/// <reference path="../typings/chrome/chrome.d.ts"/>
'use strict';
var EventPage;
(function (EventPage_1) {
    var VerbType;
    (function (VerbType) {
        VerbType[VerbType["InitDone"] = 0] = "InitDone";
        VerbType[VerbType["Listening"] = 1] = "Listening";
        VerbType[VerbType["Other"] = 2] = "Other";
    })(VerbType || (VerbType = {}));
    ;
    var MessageType = (function () {
        function MessageType() {
        }
        return MessageType;
    })();
    EventPage_1.MessageType = MessageType;
    var EventPage = (function () {
        function EventPage() {
            this.portConnect_ = null;
            this.tab_ = null;
            this.enabled_ = false;
            chrome.browserAction.onClicked.addListener(this.OnClick);
        }
        EventPage.prototype.OnClick = function (tab) {
            this.HandleActionButton(tab);
            console.log('Tab' + tab.url + tab.id + '!!');
        };
        EventPage.prototype.HandleActionButton = function (tab) {
            if (this.enabled_) {
                chrome.browserAction.setBadgeText({ text: 'off' });
                this.portConnect_.postMessage({ action: "Clr" });
                this.enabled_ = false;
            }
            else {
                try {
                    this.tab_ = tab;
                    this.enabled_ = true;
                    console.log("connect to tab: " + this.tab_.id);
                    chrome.browserAction.setBadgeText({ text: 'on' });
                    chrome.tabs.executeScript(tab.id, { file: "tabpage.js" }, this.OnExecuteScriptComplete);
                }
                catch (err) {
                    window.alert(err);
                }
            }
        };
        EventPage.prototype.OnExecuteScriptComplete = function (result) {
            var _this = this;
            this.portConnect_ = chrome.tabs.connect(this.tab_.id, { name: "klmessenger" });
            this.portConnect_.onMessage.addListener(function (msg) {
                console.log("msg received in eventpage " + msg.action);
                if (msg.action == "InitDone") {
                    console.log("postMessage ReceivedInitDone");
                    _this.portConnect_.postMessage({ action: "ReceivedInitDone" });
                }
                else if (msg.action == "Listening") {
                    console.log("Listening");
                    _this.portConnect_.postMessage({ action: "ReceivedListening" });
                }
                else {
                    console.log("EventPage.portConnect_.onMessage.addListener no msgs dispatched");
                }
            });
            console.log("OnExecuteScriptComplete");
            console.log(result);
        };
        return EventPage;
    })();
    EventPage_1.EventPage = EventPage;
})(EventPage || (EventPage = {}));
var eventPage = new EventPage.EventPage();
//# sourceMappingURL=eventpage.js.map
/// <reference path="../typings/chrome/chrome.d.ts"/>
'use strict';

module EventPage {

    enum VerbType { InitDone, Listening, Other};

    export class MessageType {

        verb: string;
    }

    export class EventPage {
        portConnect_ : chrome.runtime.Port = null;
        tab_ : chrome.tabs.Tab = null;
        enabled_ : boolean = false;

        constructor() {
            chrome.browserAction.onClicked.addListener(this.OnClick);
        }

        OnClick(tab : chrome.tabs.Tab) : void {
            this.HandleActionButton(tab);
            console.log('Tab' + tab.url + tab.id + '!!');
        }

        HandleActionButton(tab: chrome.tabs.Tab) : void {
            if (this.enabled_) {
                chrome.browserAction.setBadgeText({text: 'off'});
                this.portConnect_.postMessage({action: "Clr"});

                //EventPage.portConnect_.onMessage.addListener(EventPage.OnReceive);
                this.enabled_ = false;
            }
            else {
                try {

                    this.tab_ = tab;
                    this.enabled_ = true;
                    console.log("connect to tab: " + this.tab_.id)

                    chrome.browserAction.setBadgeText({text: 'on'});
                    chrome.tabs.executeScript(tab.id, {file: "tabpage.js"}, this.OnExecuteScriptComplete);
                }
                catch (err) {
                    window.alert(err)
                }

            }
        }


        OnExecuteScriptComplete(result : any[]) : void {
            this.portConnect_ = chrome.tabs.connect(this.tab_.id, {name: "klmessenger"});
            this.portConnect_.onMessage.addListener((msg : any) => {
                console.log("msg received in eventpage " + msg.action);
                if (msg.action == "InitDone") {
                    console.log("postMessage ReceivedInitDone");
                    this.portConnect_.postMessage({action:"ReceivedInitDone"});
                }
                else if (msg.action == "Listening") {
                    console.log("Listening");
                    this.portConnect_.postMessage({action:"ReceivedListening"});
                }
                else {
                    console.log("EventPage.portConnect_.onMessage.addListener no msgs dispatched")
                }

            });
        console.log("OnExecuteScriptComplete");
        console.log(result);

    }
    }
}

var eventPage = new EventPage.EventPage();

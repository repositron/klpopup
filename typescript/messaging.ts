/// <reference path="../typings/chrome/chrome.d.ts"/>
'use strict';

class Messaging {
    private port_ : chrome.runtime.Port = null;
    //[   dispatcher_: string] : string;//  = new Map<string, string>();
    // x : Map<string, string>;
    //dispatcherxx_ : Map<String, Function>;
    private dispatcher_ : Array<Function> = new Array<Function>();
    constructor() {
        console.log('Messaging');
        //this.dispatcher_ = new Map<String, Function>();

    }

    CreateListener() : void {
        console.log('Messaging.CreateListener');
        chrome.runtime.onConnect.addListener((port : chrome.runtime.Port) => {
            console.log("received connect from " + port.name);
            this.port_ = port;
            console.log("what is OnReceive " + this.OnReceive);
            port.onMessage.addListener((msg:any) => {
                console.log("OnReceive " + msg.action);
                var action = this.dispatcher_[msg.action];
                console.log("disp " + action);
                if (action != undefined) {
                    action();
                }
            });
            port.postMessage({action: "Listening"});
        });
    }


    OnReceive(msg : any):void {
        console.log("Messaging.OnReceive " + msg.action);
        var action = this.dispatcher_[msg.action];
        if (action != undefined) {
            action.call(null);
            //action.caller.call();
        }
    }

    SendInitiated()  :void {
        this.port_.postMessage({action: "InitDone"});
    }

    Subscribe(name:string, callback: Function) : void {
        console.log("Messaging.prototype.Subscribe");
        this.dispatcher_[name] = callback;
    }
}

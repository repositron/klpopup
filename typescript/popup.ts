/// <reference path="../typings/chrome/chrome.d.ts"/>
/// <reference path="tabpage.ts" />
'use strict';

module Popup {
    export class Popup {
        private popup_: Element;
        klcss_:Element;
        tab_:chrome.tabs.Tab;

        constructor(runAfter : Function) {

        }

        Display(htmlElement: Node): void {
            // TODO use: chrome.tabs.insertCSS
            console.log("Display");
            this.klcss_ = window.document.createElementNS('http://www.w3.org/1999/xhtml', 'link');
            this.klcss_.setAttribute('rel', 'stylesheet');
            this.klcss_.setAttribute('type', 'text/css');
            var cssFile = chrome.extension.getURL('klstyle.css');
            console.log(cssFile);
            this.klcss_.setAttribute('href', cssFile);
            this.klcss_.setAttribute('id', 'klstyle-css');
            window.document.getElementsByTagName('head')[0].appendChild(this.klcss_);

            this.popup_ = window.document.createElementNS("http://www.w3.org/1999/xhtml", "div");
            this.popup_.setAttribute('id', 'klstyle')
            this.popup_.appendChild(htmlElement);
            window.document.documentElement.appendChild(this.popup_);
            //this.popup_.style.left = 90;
            //this.popup_.style.top = 50;
            //this.popup_.style.display = '';
        }

        Clear() : void {
            console.log("clear")
            if (this.popup_) {
                this.popup_.parentNode.removeChild(this.popup_);
                this.klcss_.parentNode.removeChild(this.popup_);
            }
        }
    }
}


/// <reference path="../../typings/chrome/chrome.d.ts"/>
module JmDict {
    export interface Gloss
    {
        [index: string]: string;
    }

    export interface Entry
    {
        KeyElement : string;
        Gloss : Gloss;
    }

    export class Parser {
        public XmlToEntry(xmlEntry : string) : string {
            var root : Document = ( new DOMParser() ).parseFromString(xmlEntry, "text/xml");
            var keb = root.getElementsByTagName('keb');
            var htmlStr = '<div id="keb">' + keb[0].childNodes[0].nodeValue +  '</div>';
            return htmlStr;
        }
    }

}
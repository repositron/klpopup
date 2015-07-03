/// <reference path="../typings/chrome/chrome.d.ts"/>
/// <reference path="extractwords.ts"/>
'use strict';

module mousecap {
    interface DocumentExtend extends Document {
        caretRangeFromPoint(x: number, y: number) : Range;  // doesn't seemed to be defined anywhere
    }

    declare var document : DocumentExtend;

    interface MouseFnInterface
    {
        OnMouse(ev: MouseEvent) : void;
    }

    export class MouseFnImpl implements MouseFnInterface
    {
        private extractWords_: ExtractWords.ExtractWords;

        constructor (extractWords: ExtractWords.ExtractWords) {
            this.extractWords_ = extractWords;
        }
        public OnMouse(ev: MouseEvent) : void
        {
            var range = document.caretRangeFromPoint(ev.clientX, ev.clientY);
            var textNode = range.startContainer;
            var offset = range.startOffset;

            console.log("textNode: " + textNode + ". offset: " + offset);
            this.extractWords_.Extract(textNode, offset);
        }

    }

    export function CaptureMouse(mouseFn: MouseFnInterface) : void
    {
        window.addEventListener('mouseover', (x) => mouseFn.OnMouse(x))
    }
}

//(ev: MouseEvent) => any
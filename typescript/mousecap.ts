'use strict';

module mousecap {
    interface MouseFnInterface
    {
        OnMouse(ev: MouseEvent) : void;
    }

    export class MouseFnImpl implements MouseFnInterface
    {
        OnMouse(ev: MouseEvent) : void
        {
            var element  = document.elementFromPoint(ev.clientX, ev.clientY);
            console.log("me " +ev.clientX + " " + ev.clientY + " " + element.childElementCount);
            console.log("element: " +  element.nodeName + " " + element.nodeType + " "  +
                element.textContent + " " + element.nodeValue);
            element.
            if (element.childNodes) {
                for(var c in element.childNodes) {
                    console.log("cn" + c.nodeName);
                }
            }
        }
    }

    export function CaptureMouse(mouseFn: MouseFnInterface) : void
    {
        window.addEventListener('mouseover', (x) => mouseFn.OnMouse(x))
    }
}

//(ev: MouseEvent) => any
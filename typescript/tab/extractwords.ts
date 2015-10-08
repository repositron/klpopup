'use strict';
module ExtractWordsMod {
    export class ExtractWords {
        public Extract(textNode:Node, offset:number):string {
            // Only act on text nodes
            if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
                return "";
            }

            var data = textNode.textContent;

            // Sometimes the offset can be at the 'length' of the data.
            // It might be a bug with this 'experimental' feature
            // Compensate for this below
            if (offset >= data.length) {
                offset = data.length - 1;
            }

            // Ignore the cursor on spaces - these aren't words
            if (isWhiteSpace(data[offset])) {
                return "";
            }

            // Scan behind the current character until whitespace is found, or beginning
            var i = offset;

            while (i > 0 && !isWhiteSpace(data[i - 1])) {
                i--;
            }
            var begin = i;

            // Scan ahead of the current character until whitespace is found, or end
            i = offset;
            while (i < data.length - 1 && !isWhiteSpace(data[i + 1])) {
                i++;
            }
            var end = i;

            // This is our temporary word
            var word = data.substring(begin, end + 1);

            // If at a node boundary, cross over and see what
            // the next word is and check if this should be added to our temp word
            if (end === data.length - 1 || begin === 0) {
                var nextNode = getNextNode(textNode);
                var prevNode = getPrevNode(textNode);

                // Get the next node text
                if (end == data.length - 1 && nextNode) {
                    var nextText = nextNode.textContent;

                    // Add the letters from the next text block until a whitespace, or end
                    i = 0;
                    while (i < nextText.length && !isWhiteSpace(nextText[i])) {
                        word += nextText[i++];
                    }

                } else if (begin === 0 && prevNode) {
                    // Get the previous node text
                    var prevText = prevNode.textContent;

                    // Add the letters from the next text block until a whitespace, or end
                    i = prevText.length - 1;
                    while (i >= 0 && !isWhiteSpace(prevText[i])) {
                        word = prevText[i--] + word;
                    }
                }
            }
            return word;
        }
    }
    export function isWhiteSpace(s:string):boolean {
        return /[ \f\n\r\t\v\u00A0\u2028\u2029]/.test(s);
    }

    // Barrier nodes are BR, DIV, P, PRE, TD, TR, ...
    function isBarrierNode(node:Node):boolean {
        return node ? /^(BR|DIV|P|PRE|TD|TR|TABLE)$/i.test(node.nodeName) : true;
    }

    // Try to find the next adjacent node
    function getNextNode(node:Node):Node {
        var n:Node = null;

        // Does this node have a sibling?
        if (node.nextSibling) {
            n = node.nextSibling;

            // Doe this node's container have a sibling?
        } else if (node.parentNode && node.parentNode.nextSibling) {
            n = node.parentNode.nextSibling;
        }
        return isBarrierNode(n) ? null : n;
    }

    // Try to find the prev adjacent node
    function getPrevNode(node:Node):Node {
        var n:Node = null;

        // Does this node have a sibling?
        if (node.previousSibling) {
            n = node.previousSibling;

            // Does this node's container have a sibling?
        } else if (node.parentNode && node.parentNode.previousSibling) {
            n = node.parentNode.previousSibling;
        }
        return isBarrierNode(n) ? null : n;
    }

    // REF: http://stackoverflow.com/questions/3127369/how-to-get-selected-textnode-in-contenteditable-div-in-ie
    function getChildIndex(node:Node):number {
        var i = 0;
        while ((node = node.previousSibling)) {
            i++;
        }
        return i;
    }
}
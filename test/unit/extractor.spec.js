/// <reference path="../../typings/jquery/jquery.d.ts"/>
'use strict';
console.log("xxx1");
describe("white space", function () {
    it("is a space", function () {
        expect(ExtractWordsMod.isWhiteSpace(" ")).toBe(true);
    });
    it("is not a character", function () {
        expect(ExtractWordsMod.isWhiteSpace("b")).toBeFalsy();
    });
});
var htmlText = "<P>ラーメンを食べた</P><P>日本語</P>";
var html = jQuery.parseHTML(htmlText);
//# sourceMappingURL=extractor.spec.js.map
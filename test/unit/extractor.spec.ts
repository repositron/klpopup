/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typescript/tab/extractwords.ts"/>
'use strict';
console.log("xxx1");
describe("white space", function() {
    it("is a space", () => {
        expect(ExtractWordsMod.isWhiteSpace(" ")).toBe(true);
    });

    it ("is not a character", () => {
        expect(ExtractWordsMod.isWhiteSpace("b")).toBeFalsy();
    })
});
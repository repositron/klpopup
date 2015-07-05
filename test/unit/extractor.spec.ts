/// <reference path="../../typings/jasmine/jasmine.d.ts" />
require('typescript/extractwords.js');
'use strict';
console.log("xxx1");
describe("A suite", function() {
    console.log("xxx2");
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});
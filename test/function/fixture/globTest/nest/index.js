'use strict';
let requiredCurrentJs = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/globDest/nest/index.js'); // require source code
let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/globDest/nest/index.js', {"test":"","tar":"function"},
         'multiply',
         "[\n    [[3, 5], 15]\n]",
         [
    [[3, 5], 15]
],
         requiredCurrentJs)
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/globDest/nest/index.js');

if(typeof module === 'object') {
    module.exports = testRets;
}
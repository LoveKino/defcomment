'use strict';
require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp.js'); // require source code

let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/testParser/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp.js',
         'add',
         [[[1,2],3]],
         "[[[1,2],3]]")
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp.js');

if(typeof module === 'object') {
    module.exports = testRets;
}

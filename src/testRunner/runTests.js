'use strict';

let parseComment = require('../parseComment');
let testParser = require('../testParser');
let promisify = require('es6-promisify');
let fs = require('fs');
let browserJsEnvTest = require('browser-js-env');

let path = require('path');
let mkdirp = promisify(require('mkdirp'));
let {
    fork
} = require('child_process');

let writeFile = promisify(fs.writeFile);

let flushFile = (filePath, str, encode) => {
    return mkdirp(path.dirname(filePath)).then(() => {
        return writeFile(filePath, str, encode);
    });
};

let genTestComponents = (code, id, opts) => {
    // parse code
    let blocks = parseComment(code);
    // generate test code
    let {
        injectCode, testCode
    } = testParser(blocks, id, opts);

    let resultCode = code + '\n\n' + injectCode;

    return {
        resultCode,
        testCode
    };
};

/**
 * run tests from source code
 */
let runTests = (code, dest, test, opts = {}) => {
    let {
        resultCode, testCode
    } = genTestComponents(code, dest, opts);

    return Promise.all([
        flushFile(test, testCode, 'utf-8'),
        flushFile(dest, resultCode, 'utf-8')
    ]).then(() => {
        if (opts.env === 'browser') {
            return runTestInBrowser(test, opts);
        } else {
            return runTestInNodeProcess(test, opts);
        }
    });
};

let runTestInNodeProcess = (test, opts) => {
    let child = fork('env/nodeProcess.js', [test], {
        cwd: __dirname,
        silent: opts.silent
    });

    return new Promise((resolve, reject) => {
        child.on('message', resolve);
        child.on('error', reject);
    });
};

let runTestInBrowser = (test) => {
    return browserJsEnvTest(`module.exports=require("${test}")`, {
        testDir: path.join(__dirname, '../../test/fixture/__test_dir__'),
        clean: true
    });
};

module.exports = {
    genTestComponents,
    runTests
};
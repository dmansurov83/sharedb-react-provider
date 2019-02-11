'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diffToOps = diffToOps;
exports.text0ChangeOp = text0ChangeOp;
exports.diffToText0Ops = diffToText0Ops;

var _diffMatchPatch = require('diff-match-patch');

var _diffMatchPatch2 = _interopRequireDefault(_diffMatchPatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dmp = new _diffMatchPatch2.default();

function diffToOps(diff) {
    return diff.map(function (d) {
        var opType = d[0];
        var opVal = d[1];
        var op = null;
        if (opType === _diffMatchPatch2.default.DIFF_INSERT) {
            op = opVal;
        }
        if (opType === _diffMatchPatch2.default.DIFF_DELETE) {
            op = { d: opVal.length };
        }
        if (opType === _diffMatchPatch2.default.DIFF_EQUAL) {
            op = opVal.length;
        }
        return op;
    });
}

function text0ChangeOp(path, prev, current) {
    return {
        p: path,
        t: 'text0',
        o: diffToText0Ops(prev, current)
    };
}

function diffToText0Ops(prev, current) {
    var diff = dmp.diff_main(prev, current);
    var pos = 0;
    var delCnt = 0;
    var ops = diff.reduce(function (ops, d) {
        var opType = d[0];
        var opVal = d[1];
        if (opType === _diffMatchPatch2.default.DIFF_INSERT) {
            ops.push({
                p: pos,
                i: opVal
            });
        }
        if (opType === _diffMatchPatch2.default.DIFF_DELETE) {
            ops.push({
                p: pos - delCnt,
                d: opVal
            });
            delCnt += opVal.length;
        }
        pos += opVal.length;
        return ops;
    }, []);
    return ops;
}
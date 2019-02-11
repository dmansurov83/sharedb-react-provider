import DMP from 'diff-match-patch';

const dmp = new DMP();

export function diffToOps(diff) {
    return diff.map(d => {
        const opType = d[0];
        const opVal = d[1];
        let op = null;
        if (opType === DMP.DIFF_INSERT) {
            op = opVal
        }
        if (opType === DMP.DIFF_DELETE) {
            op = {d: opVal.length}
        }
        if (opType === DMP.DIFF_EQUAL) {
            op = opVal.length
        }
        return op;

    })
}

export function text0ChangeOp(path, prev, current) {
    return {
        p: path,
        t: 'text0',
        o: diffToText0Ops(prev, current),
    }
}

export function diffToText0Ops(prev, current) {
    const diff = dmp.diff_main(prev, current);
    let pos = 0;
    let delCnt = 0;
    const ops = diff.reduce((ops, d) => {
        const opType = d[0];
        const opVal = d[1];
        if (opType === DMP.DIFF_INSERT) {
            ops.push({
                p: pos,
                i: opVal,
            })
        }
        if (opType === DMP.DIFF_DELETE) {
            ops.push({
                p: pos - delCnt,
                d: opVal
            });
            delCnt += opVal.length;
        }
        pos += opVal.length;
        return ops
    }, []);
    return ops;
}

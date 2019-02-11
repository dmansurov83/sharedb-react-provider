import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {text0ChangeOp} from "./TextUtils";
import OTContext from './OTContext';

class Text0 extends Component {
    static propTypes = {
        value: PropTypes.string,
        path: PropTypes.array,
        children: PropTypes.func,
    };

    static contextType = OTContext;

    onChange = (e) => {
        const {path, value} = this.props;
        this.context.submitOp(
            text0ChangeOp(path, value, e.target.value)
        );
    };

    render() {
        const {children, value} = this.props;
        return (
            children({
                value,
                onChange: this.onChange,
            })
        );
    }
}

export default Text0;

export function TextAreaText0({path, value, onOp, ...props}) {
    return <Text0 path={path} onOp={onOp} value={value}>
        {({value, onChange}) =>
            <textarea {...props} value={value} onChange={onChange}/>
        }
    </Text0>
}

export function InputText0({path, value, onOp, ...props}) {
    return <Text0 path={path} onOp={onOp} value={value}>
        {({value, onChange}) =>
            <input {...props} value={value} onChange={onChange}/>
        }
    </Text0>
}


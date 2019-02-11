import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OTContext from './OTContext';

class OTDocument extends Component {
    static propTypes = {
        connect: PropTypes.func,
        collection: PropTypes.string,
        id: PropTypes.string,
        defaultData: PropTypes.any,
        type: PropTypes.string,
        children: PropTypes.func,
    };

    static defaultProps = {
        type: 'json0',
    };

    state = {
        data: null,
        isReady: false,
        connectionState: 'disconnected',
    };

    otContext = {
        submitOp: (op) => {
            this.doc.submitOp(op);
        },
    };

    componentDidMount() {
        this.connect();
    }

    // eslint-disable-next-line no-unused-vars
    onOp = (...args) => {
        this.setState({
            data: this.doc.data,
        });
    };

    async connect() {
        const {
            connect, collection, id, defaultData, type,
        } = this.props;
        const connection = await connect();
        connection.on('state', (state) => {
            this.setState({connectionState: state});
        });
        const doc = connection.get(collection, id);
        doc.subscribe((err) => {
            if (err) {
                throw err;
            }
            if (!doc.data) {
                doc.create(defaultData, type);
            }
            this.setState({isReady: true, data: doc.data});
        });
        doc.on('op', this.onOp);
        this.doc = doc;
    }

    render() {
        const {children} = this.props;
        const {isReady, data, connectionState} = this.state;
        const {submitOp} = this.otContext;
        return (
            <OTContext.Provider value={this.otContext}>
                {children({
                    isReady, data, connectionState, submitOp,
                })}
            </OTContext.Provider>
        );
    }
}

export default OTDocument;

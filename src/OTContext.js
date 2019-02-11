import React from 'react';

const OTContext = React.createContext({
    submitOp: () => {
        throw new Error('submitOp not implemented');
    },
});

export default OTContext;

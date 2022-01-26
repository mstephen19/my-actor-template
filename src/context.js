const { createKVContext } = require('../utils/contextHooks');

const reducer = (state, action) => {
    switch (action.type) {
        default: {
            return state;
        }
        case 'GENERAL': {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
};

exports.initContext = async () => createKVContext({}, reducer);

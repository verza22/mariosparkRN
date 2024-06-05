import { DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE } from './../actions/dataRequest';

const initialState = {
    loading: false,
    error: ''
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case DATA_REQUEST:
            return {
                loading: true,
                error: ''
            };
        case DATA_SUCCESS:
            return {
                loading: false,
                error: ''
            };
        case DATA_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;

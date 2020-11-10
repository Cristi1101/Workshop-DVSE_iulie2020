export type StoreType = {
    counter: number
};

const DEFAULT_STATE: StoreType = {
    counter: 0
};

export type StoreAction = { type: "INCREMENT" } | { type: "DECREMENT", payload?: number }

export function reducer(state = DEFAULT_STATE, action: StoreAction): StoreType{
    switch(action.type){
        case "INCREMENT": {
            return {
                ...state,
                counter: state.counter + 1
            }
        }
        case "DECREMENT": {
            return {
                ...state,
                counter: state.counter - action.payload
            }
        }
        default: 
            return state;
    }
}

export function increment(): StoreAction {
    return {
        type: 'INCREMENT'
    }
}

export function decrement(val?: number): StoreAction {
    return {
        type: 'DECREMENT',
        payload: val ?? 1
    }
}
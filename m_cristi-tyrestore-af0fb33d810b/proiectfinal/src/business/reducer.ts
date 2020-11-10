import { StoreType, ComponentActionType } from "./model"

const DEFAULT_STATE: StoreType = {
    basket: {
        items: []
    },
    tires: {
        items: []
    },
    vehicles: {
        items: []
    }
}


export function reducer(state = DEFAULT_STATE, action: ComponentActionType): StoreType {
    switch (action.type) {
        case "VEHICLES_LOADING": {
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    loading: true
                }
            }
        }
        case "VEHICLES_LOADED": {
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    loading: false,
                    items: action.payload
                }
            }
        }
        case "SELECT_VEHICLE": {
            return {
                ...state,
                selectedVehicle: state.selectedVehicle?.id != action.payload.id ? action.payload : undefined,
                tires: {
                    items: [],
                    loading: true
                }
            }
        }
        case "TIRES_LOADED": {
            return {
                ...state,
                tires: {
                    ...state.tires,
                    loading: false,
                    items: action.payload
                }
            }
        }
        case "ADD_TIRE_TO_BASKET": {
            return {
                ...state,
                basket: {
                    items: [...state.basket.items, action.payload]
                }
            }
        }
    }
    return state
}
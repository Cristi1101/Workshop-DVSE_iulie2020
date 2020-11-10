import * as React from 'react'
import { Text, Icon } from "../_shared"
import { getAllVehicles } from '../../data/repositories/getAllVehicles'
import { Repositories } from '../../data/repositories'
import { Vehicle, Tire } from '../../data/models'
import VehicleTable from './vehicleTable/component'
import { StoreType } from '../../business/model'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { IActions, Actions } from '../../business/actions'
import TiresTable from './tiresTable/component'


type Props = StoreProps & DispatchProps & {

}

type StoreProps = {
    vehiclesItems: Vehicle[]
    selectedVehicle?: Vehicle
    tires: Tire[]
    tiresLoading: boolean
}

type DispatchProps = {
    actions: IActions
}

class Home extends React.Component<Props> {

    componentDidMount() {
        this.props.actions.vehiclesLoading()
        Repositories.getAllVehicles().then(
            vehicles => this.props.actions.vehiclesLoaded(vehicles)
        )
    }

    handleVehicleSelect(vehicle: Vehicle) {
        const { actions } = this.props
        actions.selectVehicle(vehicle)
        Repositories.getTiresById(vehicle.id).then(tires => {
            actions.tiresLoaded(tires)
        })
    }

    handleAddTireToBasket(tire: Tire) {
        this.props.actions.addTireToBasket(tire)
    }

    // handleAddToCart(e, tire: Tire){
    //     this.setState(state => {
    //         const cartItems = this.props.tires;
    //         let productAlreadyInBasket = false;

    //         cartItems.forEach(item => {
    //             if(item.id === tire.id){
    //                 productAlreadyInBasket = true;
    //                 item.count++;
    //             }
    //         })

    //         if(!productAlreadyInBasket){
    //             cartItems.push({...tire, count: 1})
    //         }

    //         // localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //         console.log(cartItems);
    //         return cartItems;
    //     })
    // }

    render() {
        return (
            <div className="home">
                <VehicleTable
                    onSelectVehicle={this.handleVehicleSelect.bind(this)}
                    vehicles={this.props.vehiclesItems}
                    selectedVehicle={this.props.selectedVehicle}
                />

                {this.props.selectedVehicle &&
                    <TiresTable
                        tires={this.props.tires}
                        loading={this.props.tiresLoading}
                        onAddtoBasket={this.handleAddTireToBasket.bind(this)}
                    />}
            </div>
        )
    }
}


function mapStateToProps(store: StoreType): StoreProps {
    return {
        vehiclesItems: store.vehicles.items,
        selectedVehicle: store.selectedVehicle,
        tires: store.tires.items,
        tiresLoading: store.tires.loading
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        actions: {
            vehiclesLoading: () => dispatch(Actions.vehiclesLoading()),
            // vehiclesLoaded: (vehicle: Vehicle[]) => diapatch(Actions.vehiclesLoaded(vehicle))
            vehiclesLoaded: bindActionCreators(Actions.vehiclesLoaded, dispatch),
            selectVehicle: bindActionCreators(Actions.selectVehicle, dispatch),
            tiresLoaded: bindActionCreators(Actions.tiresLoaded, dispatch),
            addTireToBasket: bindActionCreators(Actions.addTireToBasket, dispatch)

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
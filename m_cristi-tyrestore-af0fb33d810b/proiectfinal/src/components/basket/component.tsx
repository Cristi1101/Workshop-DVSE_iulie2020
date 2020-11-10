import * as React from 'react'
import { Text, Icon, Table, Button } from "../_shared"
import { Tire } from '../../data/models'
import { StoreType } from '../../business/model'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'

type Props = RouteComponentProps & StoreProps & {
    loading?: boolean
}

type StoreProps = {
    // basketItems: Tire[]
    basketItems: Array<Tire>
    // basketCount?: number
}

class Basket extends React.Component<Props> {
    renderBrand(tire: Tire) {
        return <Text>{tire.brand}</Text>
    }

    renderPrice(tire: Tire) {
        return <Text strong skin="primary">{tire.price}</Text>
    }

    renderSize(tire: Tire) {
        return <Text>{tire.size}</Text>
    }


    renderSeason(tire: Tire) {
        return <Text>{tire.season}</Text>
    }

    totalPrice() {
        const product = this.props.basketItems
        let sumTotal = 0
        product.forEach(tire => {
            sumTotal += tire.price
        });
        return sumTotal;
    }

    basketItemLength() {
        const product = this.props.basketItems
        let cont = 0
        product.forEach(() => {
            cont++
        });
        return cont;
    }

    render() {
        const { loading, basketItems, history } = this.props
        return (
            <div className={"wrapper"}>
                <div className={"title"}>
                    <Text>Basket</Text>
                </div>

                <div className={"basketLength"}>
                    <Text strong size="m" skin="highlight" alignment="right">You have {this.basketItemLength()} in the shopping cart.</Text>
                </div>

                <div className={"table"}>
                    <Table
                        className="tires-table"
                        headers={["Size", "Brand", "Season", "Price"]}
                        loading={loading}
                        items={basketItems}
                        columns={[this.renderSize, this.renderBrand, this.renderSeason, this.renderPrice]}
                    />
                </div>
                <div className={"elements"}>
                    <div className={"homepageButton"}>
                        <Button skin="primary" alignment="left" onClick={() => history.push("/")}>Back to Homepage</Button>
                    </div>
                    <div className={"totalPrice"}>
                        <Text strong size="l" skin="primary" alignment="right">Total: {this.totalPrice()}</Text>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store: StoreType): StoreProps {
    return {
        basketItems: store.basket.items
    }
}

export default connect(mapStateToProps)(withRouter(Basket))
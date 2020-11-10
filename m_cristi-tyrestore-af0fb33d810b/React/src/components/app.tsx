import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";

import Button from "./button";
import { StoreType, increment, decrement } from "../redux/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

type Props = RouteComponentProps & {
    counter?: number;
    increment?: () => void;
    decrement?: (val?: number) => void;
}

class App extends React.Component<Props> {

    handleRouteClick() {
        this.props.history.push("/");
    }

    handleHomeClick() {
        this.props.history.push("/home");
    }

    handleContactClick() {
        this.props.history.push("/contact");
    }

    handleIncrement() {
        // if(this.props.increment)
        //     this.props.increment()

            this.props.increment?.()
    }

    handleDecrement() {
            this.props.decrement?.(5)
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>{this.props.counter}</h1>
                <Button onClick={this.handleIncrement.bind(this)}>Increment</Button>
                <Button onClick={this.handleDecrement.bind(this)}>Decrement</Button>
            </div>
        );
    }
}

function mapStateToProps(store: StoreType, props: Props) {
    return {
        ...props,
        counter: store.counter
    }
}

function mapDispatchToProps(dispatch: Dispatch, props: Props) {
    return {
        ...props,
        increment: () => dispatch(increment()),
        decrement: (val?: number) => dispatch(decrement(val))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
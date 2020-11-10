import * as React from "react";

type State = {
    counter?: number;
}

export class Counter extends React.Component<any, State> {

    constructor(props) {
        super(props);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.state = {
            counter: 0
        };
    }

    handleDecrement() {
        this.setState(
            { counter: this.state.counter - 1 }
        );
    }

    handleIncrement() {
        this.setState(
            { counter: this.state.counter + 1 }
        );
    }

    render() {
        var time = Date.now();
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrement}>btn counter + </button>
                <button onClick={this.handleDecrement}>btn counter - </button>
            </div>
        );
    }
}
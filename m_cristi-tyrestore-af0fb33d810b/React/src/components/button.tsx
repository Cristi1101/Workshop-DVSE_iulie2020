import * as React from "react";
import "./button.scss";
import { SizeContext, WindowsSize } from "./context";

type Props = {
    skin?: string;
    onClick: () => void;
}

class Button extends React.Component<Props> {

    renderContent(size: WindowsSize) {
        console.log(size);
        var color = this.props.skin == "primary" ? "red" : "blue";

        return (
            <button style={{ backgroundColor: color }} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }

    render(){
        return (
            <SizeContext.Consumer>
                { (context) => this.renderContent(context) }
            </SizeContext.Consumer>
        );
    }
}

// Button.contextType = SizeContext

export default Button;
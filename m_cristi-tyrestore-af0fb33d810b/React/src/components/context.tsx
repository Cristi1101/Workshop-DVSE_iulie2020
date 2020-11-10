import * as React from "react";

const size = "m";

export type WindowsSize = "s" | "m" | "l";

export const SizeContext = React.createContext<WindowsSize>(size);

type Props = {
    children: any;
};

type State = {
    windowsSize: WindowsSize;
};

class SizeComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            windowsSize: "m"
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions() {
        const width = window.innerWidth;

        let size: WindowsSize = "m";

        if (width > 1000)
            size = "l";
        else if (width < 500)
            size = "s";

        this.setState({
            windowsSize: size
        });
    }

    render() {
        return (
            <SizeContext.Provider value={this.state.windowsSize}>
                {this.props.children}
            </SizeContext.Provider>
        );
    }
}

export default SizeComponent;
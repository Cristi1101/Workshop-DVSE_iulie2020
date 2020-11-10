import * as React from "react";

type Props = {

}

type State = {
    loaded?: boolean;
} 

class Home extends React.PureComponent<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentWillMount() { //se apeleaza inainte sa apara componenta pe interfata
        console.log("COMPONENT WILL MOUNT!");
    }

    componentDidMount(){
        console.log("COMPONENT DID MOUNT!");

        setTimeout(() => {
            this.setState({loaded: true});
        }, 1000);
    }

    componentWillUnmount(){ //se apeleaza stergerea componentei de pe interfata 
        console.log("COMPONENT WILL UNMOUNT!");
    }

    componentDidUpdate(props: Props, state: State){
        console.log("COMPONENT DID UPDATE!", this.state.loaded);
    }

    componentWillReceiveProps(props: Props){
        this.props;
    }

    // shouldComponentUpdate(props: Props, state: State){
    //     return false;
    // }

    render() {
        console.log("RENDERED");

        return (
            <div>
                <h1>HOMEEE</h1>
                { this.state.loaded != false && <h2>loaded</h2> }
            </div>
        );
    }
}

export default Home;
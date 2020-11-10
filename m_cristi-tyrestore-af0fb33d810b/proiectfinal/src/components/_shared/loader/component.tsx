import * as React from "react"

type Props ={
    className?: string
}

class Loader extends React.Component<Props> {
    render() {
        return (
            <div className={"loader " + this.props.className ?? ""} />
        )
    }
}

export default Loader
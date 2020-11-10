import * as React from "react"
import { Sizes, Skin } from "../../../data/models"
import Text from "../text/component"

type Props = {
    className?: string
    name: string
    size?: Sizes
    badge?: number
    // onClick?(): void
    onClick?: () => void
}

class Icon extends React.Component<Props> {
    render() {
        const { children, className, size, name, onClick, badge } = this.props

        let customClassName = "icon"

        if (size)
            customClassName += " icon__size--" + size

        if (className)
            customClassName += " " + className

        if(onClick)
            customClassName += " icon--clickable"

        return (
            <span className={customClassName} onClick={onClick}>
                <img src={"/images/icons/" + name + ".svg"} />
                {badge != undefined && <div className="badge">
                    <Text size="s">{badge}</Text>
                </div>}
            </span>
        )
    }
}

export default Icon
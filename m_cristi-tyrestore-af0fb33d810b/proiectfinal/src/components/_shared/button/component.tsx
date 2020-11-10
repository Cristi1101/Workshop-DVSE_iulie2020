import * as React from "react"
import { Sizes, Skin, Alignments } from "../../../data/models"


type Props = {
    className?: string
    disabled?: boolean
    isActive?: boolean
    icon?: string
    size?: Sizes
    skin?: Skin
    onClick?(): void
    alignment?: Alignments
}

class Button extends React.Component<Props> {
    render() {
        const { children, className, skin, size, disabled, isActive, onClick, icon, alignment } = this.props

        let customClassName = "button"

        if (skin)
            customClassName += " button__skin--" + skin

        if (size)
            customClassName += " button__size--" + size

        if (disabled)
            customClassName += " button--disabled"

        if (isActive)
            customClassName += " button--active"

        if (className)
            customClassName += " " + className

        if (alignment)
            customClassName += " button__alignment--" + alignment

        return (
            <button className={customClassName} onClick={onClick}>
                {children}
            </button>
        )
    }
}

export default Button
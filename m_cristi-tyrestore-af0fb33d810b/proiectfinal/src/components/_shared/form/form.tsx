import * as React from "react"
import { Sizes, Skin, Alignments } from "../../../data/models"

type Props = {
    className?: string
    size?: Sizes
    skin?: Skin
    alignment?: Alignments
}

class Form extends React.Component<Props> {
    render() {
        const { children, className, skin, size, alignment } = this.props

        let customClassName = "form"

        if (skin)
            customClassName += " form__skin--" + skin

        if (size)
            customClassName += " form__size--" + size

        if (className)
            customClassName += " " + className

        if (alignment)
            customClassName += " form__alignment--" + alignment

        return (
            <form className={customClassName}>
                {children}
            </form>
        )
    }
}

export default Form
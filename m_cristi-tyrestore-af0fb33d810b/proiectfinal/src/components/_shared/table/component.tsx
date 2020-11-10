import * as React from "react"
import { Text, Loader } from "../index"

type Props<T> = {
    className?: string
    headers: string[]
    columns: Array<(T) => React.ReactElement>
    items: T[]
    loading?: boolean
}

class Table<T> extends React.Component<Props<T>> {
    render() {
        const { headers, className, items, columns, loading } = this.props

        if (loading) {
            return (
                <div className={"table " + className ?? ""}>
                    <Loader />
                </div>
            )
        }

        return (
            <div className={"table " + className ?? ""}>
                <div className="table__header">
                    {headers.map((header, idx) => <Text key={idx} size="l" strong skin="primary">{header}</Text>)}
                </div>
                <div className="table__content">
                    {items.map((item, idx) =>
                        <div key={idx} className="table__item">
                            {columns.map((columnCallback, idx) =>
                                <div key={idx} className="table__cell">
                                    {columnCallback(item)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Table
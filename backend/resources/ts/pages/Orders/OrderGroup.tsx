import React, { useState, useEffect } from "react";
import { useGetColorMaster } from "../../hooks/order"
import type { OrderGroupByItem } from "../../models/order"

type OrderGroupProps = {
    groups: OrderGroupByItem[]
}
function OrderGroup(props: OrderGroupProps): JSX.Element {
    const { status:getColorQueryStatus , data: colorMasterQueryData } = useGetColorMaster();
    const [ colorMaster, setColorMaster ] = useState<typeof colorMasterQueryData>(colorMasterQueryData)

    useEffect(() => {
        if (getColorQueryStatus === "success") {
            setColorMaster(colorMasterQueryData);
        }
    }, [getColorQueryStatus, colorMasterQueryData]);

    const orderGroup: JSX.Element[] = props.groups.map((item) => {
        return (
            <tr className={`table-row`}
                style={ { backgroundColor: colorMaster?.find((m) => m.item_code === item.item_code)?.color?.toString() }}
                key={`${item.item_code}`}
                data-item-code={item.item_code}
                >
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
            </tr>);
    })

    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">商品名</th>
                        <th scope="col">出荷数</th>
                    </tr>
                </thead>
                <tbody>
                    {orderGroup}
                </tbody>
            </table>
        </div>
    )
}

export default OrderGroup;
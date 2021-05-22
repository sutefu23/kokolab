import React, { } from "react";
import { Order } from "../../models/order"

type OrderListProps = {
    orders: [Order]
}
function OrderList(props: OrderListProps): JSX.Element {
    const orderList: JSX.Element[] = props.orders.map((order) => {
        return (
            <tr className={`table-row`}
                key={`order_${order.reception_number}`}>
                <th scope="row">{order.reception_number}</th>
                <td>{order.item_code }</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.inclusive_sum}</td>
            </tr>);
    })

    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">受付番号</th>
                        <th scope="col">商品コード</th>
                        <th scope="col">商品名</th>
                        <th scope="col">数量</th>
                        <th scope="col">合計金額</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
        </div>
    )
}

export default OrderList;
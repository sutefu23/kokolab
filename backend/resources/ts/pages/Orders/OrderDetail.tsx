import React from "react";
import type { Order } from "../../models/order"

type OrderDetailProps = {
    order: Order|undefined,
    isShow: boolean
    onClose: () => void
}

const OrderDetail = ({order, isShow, onClose}: OrderDetailProps): JSX.Element => {

  return (
    <div className={`order-detail ${isShow?"show": ""}`}>
      <i className="fa fa-close" style={{
        position: "absolute",
        fontSize:"1.2em",
        right:10,
        top:10,
        cursor: "pointer"
      }}
      onClick={() => {onClose()}}
      ></i>
    <table className="table">
      <tr>
        <th>受付日</th>
      </tr>
      <tr>
        <td>{ order?.reception_date}</td>
      </tr>
      <tr>
        <th>受付番号</th>
      </tr>
      <tr>
        <td>{ order?.reception_number}</td>
      </tr>
      <tr>
        <th>氏名</th>
      </tr>
      <tr>
        <td>{ order?.full_name}</td>
      </tr>
      <tr>
        <th>お客様からの通信欄</th>
      </tr>
      <tr>
        <td>{ order?.communication_field_from_guest}</td>
      </tr>
      <tr>
        <th>便種</th>
      </tr>
      <tr>
        <td>{ order?.feces_type}</td>
      </tr>
      <tr>
        <th>配送指定日</th>
      </tr>
      <tr>
        <td>{ order?.delivery_specified_date}</td>
      </tr>
      <tr>
        <th>店舗内通信欄</th>
      </tr>
      <tr>
        <td>{ order?.communication_field_in_store}</td>
      </tr>
      <tr>
        <th>お客様への通信欄</th>
      </tr>
      <tr>
        <td>{ order?.communication_field_to_guest}</td>
      </tr>
      <tr>
        <th>定期回数</th>
      </tr>
      <tr>
        <td>{ order?.fixed_term_times}</td>
      </tr>
      <tr>
        <th>定期お届け周期</th>
      </tr>
      <tr>
        <td>{ order?.fixed_term_delivery_cycle}</td>
      </tr>
      <tr>
        <th>次回お届け予定（最新）</th>
      </tr>
      <tr>
        <td>{ order?.next_delivery_plan_latest}</td>
      </tr>
      <tr>
        <th>顧客メモ</th>
      </tr>
      <tr>
        <td>{ order?.customer_memo}</td>
      </tr>
    </table>

    </div>
  )
}
export default OrderDetail

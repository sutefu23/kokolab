import React from "react";
import type { Order } from "../../models/order"

type OrderDetailProps = {
    order: Order
}

const OrderDetail = ({order}: OrderDetailProps): JSX.Element => {
  return (
    <>
  <table>
    <tr>
      <th>受付日</th>
      <td>{ order.reception_date}</td>
    </tr>
    <tr>
      <th>受付時間</th>
      <td>{ order.reception_time}</td>
    </tr>
    <tr>
      <th>受付番号</th>
      <td>{ order.reception_number}</td>
    </tr>
    <tr>
      <th>枝番号</th>
      <td>{ order.branch_no_issue}</td>
    </tr>
    <tr>
      <th>商品コード</th>
      <td>{ order.item_code}</td>
    </tr>
    <tr>
      <th>商品名</th>
      <td>{ order.product_name}</td>
    </tr>
    <tr>
      <th>単価</th>
      <td>{ order.unit_price}</td>
    </tr>
    <tr>
      <th>数量</th>
      <td>{ order.quantity}</td>
    </tr>
    <tr>
      <th>小計</th>
      <td>{ order.subtotal}</td>
    </tr>
    <tr>
      <th>送料</th>
      <td>{ order.shipping_fee}</td>
    </tr>
    <tr>
      <th>手数料</th>
      <td>{ order.fee}</td>
    </tr>
    <tr>
      <th>値引き</th>
      <td>{ order.discount}</td>
    </tr>
    <tr>
      <th>総合計</th>
      <td>{ order.inclusive_sum}</td>
    </tr>
    <tr>
      <th>郵便番号</th>
      <td>{ order.postal_code}</td>
    </tr>
    <tr>
      <th>都道府県</th>
      <td>{ order.prefectures}</td>
    </tr>
    <tr>
      <th>市区郡</th>
      <td>{ order.city}</td>
    </tr>
    <tr>
      <th>町村番地</th>
      <td>{ order.town_address}</td>
    </tr>
    <tr>
      <th>建物</th>
      <td>{ order.building}</td>
    </tr>
    <tr>
      <th>氏名</th>
      <td>{ order.full_name}</td>
    </tr>
    <tr>
      <th>【お届け先】電話番号</th>
      <td>{ order.delivery_target_phone_number}</td>
    </tr>
    <tr>
      <th>メール</th>
      <td>{ order.email}</td>
    </tr>
    <tr>
      <th>支払方法</th>
      <td>{ order.payment_methods}</td>
    </tr>
    <tr>
      <th>お客様からの通信欄</th>
      <td>{ order.communication_field_from_guest}</td>
    </tr>
    <tr>
      <th>顧客種別</th>
      <td>{ order.customer_type}</td>
    </tr>
    <tr>
      <th>便種</th>
      <td>{ order.feces_type}</td>
    </tr>
    <tr>
      <th>配送指定日</th>
      <td>{ order.delivery_specified_date}</td>
    </tr>
    <tr>
      <th>配送指定時間</th>
      <td>{ order.delivery_specified_time}</td>
    </tr>
    <tr>
      <th>商品毎文書</th>
      <td>{ order.document_per_product}</td>
    </tr>
    <tr>
      <th>注文毎文書</th>
      <td>{ order.document_per_order}</td>
    </tr>
    <tr>
      <th>顧客id</th>
      <td>{ order.customer_id}</td>
    </tr>
    <tr>
      <th>出荷日</th>
      <td>{ order.shipping_date}</td>
    </tr>
    <tr>
      <th>返品日</th>
      <td>{ order.return_date}</td>
    </tr>
    <tr>
      <th>広告番号</th>
      <td>{ order.ad_number}</td>
    </tr>
    <tr>
      <th>店舗区分</th>
      <td>{ order.store_kubun}</td>
    </tr>
    <tr>
      <th>注文ステータス</th>
      <td>{ order.order_status}</td>
    </tr>
    <tr>
      <th>店舗内通信欄</th>
      <td>{ order.communication_field_in_store}</td>
    </tr>
    <tr>
      <th>お客様への通信欄</th>
      <td>{ order.communication_field_to_guest}</td>
    </tr>
    <tr>
      <th>定期回数</th>
      <td>{ order.fixed_term_times}</td>
    </tr>
    <tr>
      <th>定期お届け周期</th>
      <td>{ order.fixed_term_delivery_cycle}</td>
    </tr>
    <tr>
      <th>次回お届け予定（最新）</th>
      <td>{ order.next_delivery_plan_latest}</td>
    </tr>
    <tr>
      <th>顧客メモ</th>
      <td>{ order.customer_memo}</td>
    </tr>
  </table>


    </>
  )
}
export default OrderDetail

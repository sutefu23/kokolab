import { Color } from 'react-color';

export type Order = {
  id: number //テーブルID
  reception_date : Date //受付日
  reception_time : Date //受付時間
  reception_number : string //受付番号
  branch_no_issue : number //枝番号
  item_code : string //商品コード
  product_name : string //商品名
  unit_price : number //単価
  quantity : number //数量
  subtotal : number //小計
  shipping_fee : number //送料
  fee : number //手数料
  discount : number //値引き
  inclusive_sum : number //総合計
  postal_code : string //郵便番号
  prefectures : string //都道府県
  city : string //市区郡
  town_address : string //町村番地
  building : string //建物
  full_name : string //氏名
  delivery_target_phone_number : string //【お届け先】電話番号
  email : string //メール
  payment_methods : string //支払方法
  communication_field_from_guest : string //お客様からの通信欄
  customer_type : string //顧客種別
  feces_type : string //便種
  delivery_specified_date : Date //配送指定日
  delivery_specified_time : Date //配送指定時間
  document_per_product : string //商品毎文書
  document_per_order : string //注文毎文書
  customer_id : string //顧客id
  shipping_date : Date //出荷日
  return_date : Date //返品日
  ad_number : string //広告番号
  store_kubun : string //店舗区分
  order_status : string //注文ステータス
  communication_field_in_store : string //店舗内通信欄
  communication_field_to_guest : string //お客様への通信欄
  fixed_term_times : number //定期回数
  fixed_term_delivery_cycle : string //定期お届け周期
  next_delivery_plan_latest : Date //次回お届け予定（最新）
  shipment_number : string //出荷番号
  customer_before_migration : string //移行前顧客番号
  order_before_migration : string //移行前注文番号
  customer_memo : string //顧客メモ
  shipping_fee_2 : number //送料2
  fee_2 : number //手数料2
  discount_2 : number //値引き2
  inclusive_sum_2 : number //総合計2
  delivery_due_date : Date //発送予定日
  next_delivery_expected_date : Date //次回発送予定日
  orderer_postal_code : string //【注文者】郵便番号
  orderer_prefectures : string //【注文者】都道府県
  orderer_city : string //【注文者】市区郡
  orderer_town_address : string //【注文者】町村番地
  orderer_building : string //【注文者】建物
  orderer_full_name : string //【注文者】氏名
  orderer_phone_number : string //【注文者】電話番号
  orderer_name_family_name : string //【注文者】氏名（姓）
  orderer_name_name : string //【注文者】氏名（名）
  orderer_name_kana_family_name : string //【注文者】氏名カナ（姓）
  orderer_name_kana_name : string //【注文者】氏名カナ（名）
  delivery_target_name_family_name : string //【お届け先】氏名（姓）
  delivery_target_name_name : string //【お届け先】氏名（名）
  delivery_target_name_kana_family_name : string //【お届け先】氏名カナ（姓）
  delivery_target_name_kana_name : string //【お届け先】氏名カナ（名）
  birthdate : Date //生年月日
  sex : string //性別
  zeus_order_number : string //ゼウスオーダー番号
  zeus_ip_code : string //ゼウスipコード
  coupon_code : string //クーポンコード
  fixed_term_order_date : Date //定期注文日
  order_id : string //注文id
  gmo_order_number : string //gmoオーダー番号
  fixed_term_order_number : string //定期注文番号
  manager_memo : string //管理者メモ
  guest_representative : string //お客様担当者
  guest_to_communicating_field_fixed_term : string //お客様への通信欄（定期）
  guest_from_communicating_field_fixed_term : string //お客様からの通信欄（定期）
  store_within_communicating_field_fixed_term : string //店舗内通信欄（定期）
  administrator_memo_fixed_term : string //管理者メモ（定期）
  np_trading_id : string //np取引id
  np_franchised_store_id : string //np加盟店id
  numberernal_tax_etc : number //内消費税等
  fixed_term_delivery_cycle_2 : string //定期お届け周期2
  order_representative : string //受注担当者
  fixed_term_delivery_status : string //定期配送ステータス
  pause_date : Date //休止日
  tax_rate_kubun : string //税率区分
  tax_rate : string //税率
  amazonpay_reference_id : string //amazonpayリファレンスid
  is_shipping_fixed : boolean //確定データか否か
}

export type OrderColorMaster = {
  item_code : string //商品コード
  color: Color
}

export type OrderGroupByItem = {
  item_code : string
  product_name: string
  quantity: number
}
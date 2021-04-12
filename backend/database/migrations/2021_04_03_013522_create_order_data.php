<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_data', function (Blueprint $table) {
            $table->id();
            $table->date('reception_date')->comment('受付日');
            $table->time('reception_time')->comment('受付時間');
            $table->string('reception_number')->comment('受付番号');
            $table->integer('branch_no_issue')->comment('枝番号');
            $table->string('item_code')->comment('商品コード');
            $table->string('product_name')->comment('商品名');
            $table->integer('unit_price')->comment('単価');
            $table->integer('quantity')->comment('数量');
            $table->integer('subtotal')->comment('小計');
            $table->integer('shipping_fee')->comment('送料');
            $table->integer('fee')->comment('手数料');
            $table->integer('discount')->comment('値引き');
            $table->integer('inclusive_sum')->comment('総合計');
            $table->string('postal_code')->comment('郵便番号');
            $table->string('prefectures')->comment('都道府県');
            $table->string('city')->comment('市区郡');
            $table->string('town_address')->comment('町村番地');
            $table->string('building')->comment('建物');
            $table->string('full_name')->comment('氏名');
            $table->string('delivery_target_phone_number')->comment('【お届け先】電話番号');
            $table->string('email')->comment('メール');
            $table->string('payment_methods')->comment('支払方法');
            $table->string('communication_field_from_guest')->comment('お客様からの通信欄');
            $table->string('customer_type')->comment('顧客種別');
            $table->string('feces_type')->comment('便種');
            $table->date('delivery_specified_date')->comment('配送指定日');
            $table->time('delivery_specified_time')->comment('配送指定時間');
            $table->string('document_per_product')->comment('商品毎文書');
            $table->string('document_per_order')->comment('注文毎文書');
            $table->string('customer_id')->comment('顧客id');
            $table->date('shipping_date')->comment('出荷日');
            $table->date('return_date')->comment('返品日');
            $table->string('ad_number')->comment('広告番号');
            $table->string('store_kubun')->comment('店舗区分');
            $table->string('order_status')->comment('注文ステータス');
            $table->string('communication_field_in_store')->comment('店舗内通信欄');
            $table->string('communication_field_to_guest')->comment('お客様への通信欄');
            $table->mediuminteger('fixed_term_times')->comment('定期回数');
            $table->string('fixed_term_delivery_cycle')->comment('定期お届け周期');
            $table->date('next_delivery_plan_latest')->comment('次回お届け予定（最新）');
            $table->string('shipment_number')->comment('出荷番号');
            $table->string('customer_before_migration')->comment('移行前顧客番号');
            $table->string('order_before_migration')->comment('移行前注文番号');
            $table->string('customer_memo')->comment('顧客メモ');
            $table->integer('shipping_fee_2')->comment('送料2');
            $table->integer('fee_2')->comment('手数料2');
            $table->integer('discount_2')->comment('値引き2');
            $table->integer('inclusive_sum_2')->comment('総合計2');
            $table->date('delivery_due_date')->comment('発送予定日');
            $table->date('next_delivery_expected_date')->comment('次回発送予定日');
            $table->string('orderer_postal_code')->comment('【注文者】郵便番号');
            $table->string('orderer_prefectures')->comment('【注文者】都道府県');
            $table->string('orderer_city')->comment('【注文者】市区郡');
            $table->string('orderer_town_address')->comment('【注文者】町村番地');
            $table->string('orderer_building')->comment('【注文者】建物');
            $table->string('orderer_full_name')->comment('【注文者】氏名');
            $table->string('orderer_phone_number')->comment('【注文者】電話番号');
            $table->string('orderer_name_family_name')->comment('【注文者】氏名（姓）');
            $table->string('orderer_name_name')->comment('【注文者】氏名（名）');
            $table->string('orderer_name_kana_family_name')->comment('【注文者】氏名カナ（姓）');
            $table->string('orderer_name_kana_name')->comment('【注文者】氏名カナ（名）');
            $table->string('delivery_target_name_family_name')->comment('【お届け先】氏名（姓）');
            $table->string('delivery_target_name_name')->comment('【お届け先】氏名（名）');
            $table->string('delivery_target_name_kana_family_name')->comment('【お届け先】氏名カナ（姓）');
            $table->string('delivery_target_name_kana_name')->comment('【お届け先】氏名カナ（名）');
            $table->date('birthdate')->comment('生年月日');
            $table->string('sex')->comment('性別');
            $table->string('zeus_order_number')->comment('ゼウスオーダー番号');
            $table->string('zeus_ip_code')->comment('ゼウスipコード');
            $table->string('coupon_code')->comment('クーポンコード');
            $table->date('fixed_term_order_date')->comment('定期注文日');
            $table->string('order_id')->comment('注文id');
            $table->string('gmo_order_number')->comment('gmoオーダー番号');
            $table->string('fixed_term_order_number')->comment('定期注文番号');
            $table->string('manager_memo')->comment('管理者メモ');
            $table->string('guest_representative')->comment('お客様担当者');
            $table->string('guest_to_communicating_field_fixed_term')->comment('お客様への通信欄（定期）');
            $table->string('guest_from_communicating_field_fixed_term')->comment('お客様からの通信欄（定期）');
            $table->string('store_within_communicating_field_fixed_term')->comment('店舗内通信欄（定期）');
            $table->string('administrator_memo_fixed_term')->comment('管理者メモ（定期）');
            $table->string('np_trading_id')->comment('np取引id');
            $table->string('np_franchised_store_id')->comment('np加盟店id');
            $table->integer('internal_tax_etc')->comment('内消費税等');
            $table->string('fixed_term_delivery_cycle_2')->comment('定期お届け周期2');
            $table->string('order_representative')->comment('受注担当者');
            $table->string('fixed_term_delivery_status')->comment('定期配送ステータス');
            $table->date('pause_date')->comment('休止日');
            $table->string('tax_rate_kubun')->comment('税率区分');
            $table->string('tax_rate')->comment('税率');
            $table->string('amazonpay_reference_id')->comment('amazonpayリファレンスid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_data');
    }
}

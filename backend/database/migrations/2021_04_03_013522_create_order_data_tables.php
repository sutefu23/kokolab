<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDataTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_data_tables', function (Blueprint $table) {
            $table->id();
            $table->date('reception_date')
            $table->time('reception_time')
            $table->varchar('reception_number,255')
            $table->smallint('branch_no_issue')
            $table->varchar('item_code,255')
            $table->varchar('product_name,255')
            $table->int('unit_price')
            $table->int('quantity')
            $table->int('subtotal')
            $table->int('shipping_fee')
            $table->int('fee')
            $table->int('discount')
            $table->int('inclusive_sum')
            $table->varchar('postal_code,255')
            $table->varchar('prefectures,255')
            $table->varchar('city,255')
            $table->varchar('town_address,255')
            $table->varchar('building,255')
            $table->varchar('full_name,255')
            $table->varchar('delivery_target_phone_number,255')
            $table->varchar('email,255')
            $table->varchar('payment_methods,255')
            $table->varchar('communication_field_from_guest,255')
            $table->varchar('customer_type,255')
            $table->varchar('feces_type,255')
            $table->date('delivery_specified_date')
            $table->time('delivery_specified_time')
            $table->varchar('document_per_product,255')
            $table->varchar('document_per_order,255')
            $table->varchar('customer_id,255')
            $table->date('shipping_date')
            $table->date('return_date')
            $table->varchar('ad_number,255')
            $table->varchar('store_kubun,255')
            $table->varchar('order_status,255')
            $table->varchar('communication_field_in_store,255')
            $table->varchar('communication_field_to_guest,255')
            $table->mediumint('fixed_term_times')
            $table->varchar('fixed_term_delivery_cycle,255')
            $table->date('next_delivery_plan_latest')
            $table->varchar('shipment_number,255')
            $table->varchar('customer_before_migration,255')
            $table->varchar('order_before_migration,255')
            $table->varchar('customer_memo,255')
            $table->int('shipping_fee_2')
            $table->int('fee_2')
            $table->int('discount_2')
            $table->int('inclusive_sum_2')
            $table->date('delivery_due_date')
            $table->date('next_delivery_expected_date')
            $table->varchar('orderer_postal_code,255')
            $table->varchar('orderer_prefectures,255')
            $table->varchar('orderer_city,255')
            $table->varchar('orderer_town_address,255')
            $table->varchar('orderer_building,255')
            $table->varchar('orderer_full_name,255')
            $table->varchar('orderer_phone_number,255')
            $table->varchar('orderer_name_family_name,255')
            $table->varchar('orderer_name_name,255')
            $table->varchar('orderer_name_kana_family_name,255')
            $table->varchar('orderer_name_kana_name,255')
            $table->varchar('delivery_target_name_family_name,255')
            $table->varchar('delivery_target_name_name,255')
            $table->varchar('delivery_target_name_kana_family_name,255')
            $table->varchar('delivery_target_name_kana_name,255')
            $table->date('birthdate')
            $table->varchar('sex,255')
            $table->varchar('zeus_order_number,255')
            $table->varchar('zeus_ip_code,255')
            $table->varchar('coupon_code,255')
            $table->date('fixed_term_order_date')
            $table->varchar('order_id,255')
            $table->varchar('gmo_order_number,255')
            $table->varchar('fixed_term_order_number,255')
            $table->varchar('manager_memo,255')
            $table->varchar('guest_representative,255')
            $table->varchar('guest_to_communicating_field_fixed_term,255')
            $table->varchar('guest_from_communicating_field_fixed_term,255')
            $table->varchar('store_within_communicating_field_fixed_term,255')
            $table->varchar('administrator_memo_fixed_term,255')
            $table->varchar('np_trading_id,255')
            $table->varchar('np_franchised_store_id,255')
            $table->int('internal_tax_etc')
            $table->varchar('fixed_term_delivery_cycle_2,255')
            $table->varchar('order_representative,255')
            $table->varchar('fixed_term_delivery_status,255')
            $table->date('pause_date')
            $table->varchar('tax_rate_kubun,255')
            $table->varchar('tax_rate,255')
            $table->varchar('amazonpay_reference_id,255')
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
        Schema::dropIfExists('order_data_tables');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $reception_date
 * @property string $reception_time
 * @property string $reception_number
 * @property int $branch_no_issue
 * @property string $item_code
 * @property string $product_name
 * @property int $unit_price
 * @property int $quantity
 * @property int $subtotal
 * @property int $shipping_fee
 * @property int $fee
 * @property int $discount
 * @property int $inclusive_sum
 * @property string $postal_code
 * @property string $prefectures
 * @property string $city
 * @property string $town_address
 * @property string $building
 * @property string $full_name
 * @property string $delivery_target_phone_number
 * @property string $email
 * @property string $payment_methods
 * @property string $communication_field_from_guest
 * @property string $customer_type
 * @property string $feces_type
 * @property string $delivery_specified_date
 * @property string $delivery_specified_time
 * @property string $document_per_product
 * @property string $document_per_order
 * @property string $customer_id
 * @property string $shipping_date
 * @property string $return_date
 * @property string $ad_number
 * @property string $store_kubun
 * @property string $order_status
 * @property string $communication_field_in_store
 * @property string $communication_field_to_guest
 * @property int $fixed_term_times
 * @property string $fixed_term_delivery_cycle
 * @property string $next_delivery_plan_latest
 * @property string $shipment_number
 * @property string $customer_before_migration
 * @property string $order_before_migration
 * @property string $customer_memo
 * @property int $shipping_fee_2
 * @property int $fee_2
 * @property int $discount_2
 * @property int $inclusive_sum_2
 * @property string $delivery_due_date
 * @property string $next_delivery_expected_date
 * @property string $orderer_postal_code
 * @property string $orderer_prefectures
 * @property string $orderer_city
 * @property string $orderer_town_address
 * @property string $orderer_building
 * @property string $orderer_full_name
 * @property string $orderer_phone_number
 * @property string $orderer_name_family_name
 * @property string $orderer_name_name
 * @property string $orderer_name_kana_family_name
 * @property string $orderer_name_kana_name
 * @property string $delivery_target_name_family_name
 * @property string $delivery_target_name_name
 * @property string $delivery_target_name_kana_family_name
 * @property string $delivery_target_name_kana_name
 * @property string $birthdate
 * @property string $sex
 * @property string $zeus_order_number
 * @property string $zeus_ip_code
 * @property string $coupon_code
 * @property string $fixed_term_order_date
 * @property string $order_id
 * @property string $gmo_order_number
 * @property string $fixed_term_order_number
 * @property string $manager_memo
 * @property string $guest_representative
 * @property string $guest_to_communicating_field_fixed_term
 * @property string $guest_from_communicating_field_fixed_term
 * @property string $store_within_communicating_field_fixed_term
 * @property string $administrator_memo_fixed_term
 * @property string $np_trading_id
 * @property string $np_franchised_store_id
 * @property int $internal_tax_etc
 * @property string $fixed_term_delivery_cycle_2
 * @property string $order_representative
 * @property string $fixed_term_delivery_status
 * @property string $pause_date
 * @property string $tax_rate_kubun
 * @property string $tax_rate
 * @property string $amazonpay_reference_id
 * @property string $created_at
 * @property string $updated_at
 */
class Orders extends Model
{
    protected $table = 'orders';
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['reception_date', 'reception_time', 'reception_number', 'branch_no_issue', 'item_code', 'product_name', 'unit_price', 'quantity', 'subtotal', 'shipping_fee', 'fee', 'discount', 'inclusive_sum', 'postal_code', 'prefectures', 'city', 'town_address', 'building', 'full_name', 'delivery_target_phone_number', 'email', 'payment_methods', 'communication_field_from_guest', 'customer_type', 'feces_type', 'delivery_specified_date', 'delivery_specified_time', 'document_per_product', 'document_per_order', 'customer_id', 'shipping_date', 'return_date', 'ad_number', 'store_kubun', 'order_status', 'communication_field_in_store', 'communication_field_to_guest', 'fixed_term_times', 'fixed_term_delivery_cycle', 'next_delivery_plan_latest', 'shipment_number', 'customer_before_migration', 'order_before_migration', 'customer_memo', 'shipping_fee_2', 'fee_2', 'discount_2', 'inclusive_sum_2', 'delivery_due_date', 'next_delivery_expected_date', 'orderer_postal_code', 'orderer_prefectures', 'orderer_city', 'orderer_town_address', 'orderer_building', 'orderer_full_name', 'orderer_phone_number', 'orderer_name_family_name', 'orderer_name_name', 'orderer_name_kana_family_name', 'orderer_name_kana_name', 'delivery_target_name_family_name', 'delivery_target_name_name', 'delivery_target_name_kana_family_name', 'delivery_target_name_kana_name', 'birthdate', 'sex', 'zeus_order_number', 'zeus_ip_code', 'coupon_code', 'fixed_term_order_date', 'order_id', 'gmo_order_number', 'fixed_term_order_number', 'manager_memo', 'guest_representative', 'guest_to_communicating_field_fixed_term', 'guest_from_communicating_field_fixed_term', 'store_within_communicating_field_fixed_term', 'administrator_memo_fixed_term', 'np_trading_id', 'np_franchised_store_id', 'internal_tax_etc', 'fixed_term_delivery_cycle_2', 'order_representative', 'fixed_term_delivery_status', 'pause_date', 'tax_rate_kubun', 'tax_rate', 'amazonpay_reference_id', 'created_at', 'updated_at'];

}

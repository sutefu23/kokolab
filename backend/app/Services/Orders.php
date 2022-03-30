<?php
namespace App\Services;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Orders{
    //DBで検索に使うため、Y-m-d H:i:sの形からタイムゾーンを考慮したY-m-dの形にします。
    /**
     * @throws \Exception
     */
    private static function _getQueryDate(string $targetDate): string
    {
        $date = new DateTime($targetDate);
        return $date->format('Y-m-d');
    }

    /**
     * 引数が一つの時はその日のみを抽出
     * @param string $fromDate
     * @param string|null $toDate
     * @return Collection
     */
    public static function getOrders(string $fromDate, string $toDate = null): Collection
    {
        if(!$toDate){
            $toDate = $fromDate;
        }
        return DB::table('orders')->whereBetween('delivery_due_date', [self::_getQueryDate($fromDate), self::_getQueryDate($toDate)])->get();
    }

    /**
     * @param array $delete_ids
     * @return Collection
     * @throws \Exception
     */
    public static function deleteOrder(array $delete_ids, string $target_date): Collection
    {
        try{
            DB::beginTransaction();
            DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->whereIn('id', $delete_ids)->delete();
            DB::commit();
            DB::enableQueryLog();
            DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->get();
            debug(DB::getQueryLog());
            return DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->get();
        }catch (\Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param array $ids
     * @return Collection
     * @throws \Exception
     */
    public static function settleShipping(array $ids, string $target_date): Collection
    {
        try{
            DB::beginTransaction();
            DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->whereIn('id', $ids)->update(['is_shipping_fixed' => true]);
            DB::commit();
            return DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->get();
        }catch (\Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param string $fromDate
     * @param string $toDate
     * @return Collection
     * @throws \Exception
     */
    public static function groupByItem(string $fromDate, string $toDate): Collection
    {
        return DB::table('orders')
            ->selectRaw('item_code, product_name, sum(quantity) as quantity')
            ->groupBy(['item_code', 'product_name'])
            ->orderByRaw('CONVERT(item_code, UNSIGNED INTEGER )')
            ->whereBetween('delivery_due_date',[self::_getQueryDate($fromDate), self::_getQueryDate($toDate)])
            ->get();
    }

    /**
     * CSVの一行からOrderレコードを生成（カンマ区切り）
     * @param $row
     * @return Collection
     * @throws \Exception
     */
    public static function csv_body_to_order($csv_body){
        DB::beginTransaction();
        $delivery_due_date = null;//アップロードした明細の発送予定日

        try {
            foreach ($csv_body as $row) {
                $columns = explode('","', $row);//文章の中にカンマがあるため
                if(count($columns) <= 1 ) continue;//最後のカンマが空の1行とみなされることがあるため
                $order = new \App\Models\Orders;
                $order->reception_date	=	empty($columns[0])?null:Carbon::parse(ltrim($columns[0],'"'))->format("Y-m-d");
                $order->reception_time	=	empty($columns[1])?null:Carbon::parse($columns[1])->format("G:i:s");
                $order->reception_number	=	empty($columns[2])?null:$columns[2];
                $order->branch_no_issue	=	empty($columns[3])?null:$columns[3];
                $order->item_code	=	$columns[4];
                $order->product_name	=	$columns[5];
                $order->unit_price	=	empty($columns[6])?null:$columns[6];
                $order->quantity	=	empty($columns[7])?null:$columns[7];
                $order->subtotal	=	empty($columns[8])?null:$columns[8];
                $order->shipping_fee	=	empty($columns[9])?null:$columns[9];
                $order->fee	=	empty($columns[10])?null:$columns[10];
                $order->discount	=	empty($columns[11])?null:$columns[11];
                $order->inclusive_sum	=	empty($columns[12])?null:$columns[12];
                $order->postal_code	=	$columns[13];
                $order->prefectures	=	$columns[14];
                $order->city	=	$columns[15];
                $order->town_address	=	$columns[16];
                $order->building	=	$columns[17];
                $order->full_name	=	$columns[18];
                $order->delivery_target_phone_number	=	$columns[19];
                $order->email	=	$columns[20];
                $order->payment_methods	=	$columns[21];
                $order->communication_field_from_guest	=	$columns[22];
                $order->customer_type	=	$columns[23];
                $order->feces_type	=	$columns[24];
                $order->delivery_specified_date	=	empty($columns[25])?null:Carbon::parse($columns[25])->format("Y-m-d");
                $order->delivery_specified_time	=	empty($columns[26])||$columns[26]=='指定なし'?null:$columns[26];
                $order->document_per_product	=	$columns[27];
                $order->document_per_order	=	$columns[28];
                $order->customer_id	=	$columns[29];
                $order->shipping_date	=	empty($columns[30])?null:Carbon::parse($columns[30])->format("Y-m-d");
                $order->return_date	=	empty($columns[31])?null:Carbon::parse($columns[31])->format("Y-m-d");
                $order->ad_number	=	$columns[32];
                $order->store_kubun	=	$columns[33];
                $order->order_status	=	$columns[34];
                $order->communication_field_in_store	=	$columns[35];
                $order->communication_field_to_guest	=	$columns[36];
                $order->fixed_term_times	=	empty($columns[37])?null:$columns[37];
                $order->fixed_term_delivery_cycle	=	$columns[38];
                $order->next_delivery_plan_latest	=	empty($columns[39])?null:$columns[39];
                $order->shipment_number	=	$columns[40];
                $order->customer_before_migration	=	$columns[41];
                $order->order_before_migration	=	$columns[42];
                $order->customer_memo	=	$columns[43];
                $order->shipping_fee_2	=	empty($columns[44])?null:$columns[44];
                $order->fee_2	=	empty($columns[45])?null:$columns[45];
                $order->discount_2	=	empty($columns[46])?null:$columns[46];
                $order->inclusive_sum_2	=	empty($columns[47])?null:$columns[47];
                $delivery_due_date = empty($columns[48])?null:Carbon::parse($columns[48])->format("Y-m-d");
                $order->delivery_due_date = $delivery_due_date;
                $order->next_delivery_expected_date	=	empty($columns[49])?null:Carbon::parse($columns[49])->format("Y-m-d");
                $order->orderer_postal_code	=	$columns[50];
                $order->orderer_prefectures	=	$columns[51];
                $order->orderer_city	=	$columns[52];
                $order->orderer_town_address	=	$columns[53];
                $order->orderer_building	=	$columns[54];
                $order->orderer_full_name	=	$columns[55];
                $order->orderer_phone_number	=	$columns[56];
                $order->orderer_name_family_name	=	$columns[57];
                $order->orderer_name_name	=	$columns[58];
                $order->orderer_name_kana_family_name	=	$columns[59];
                $order->orderer_name_kana_name	=	$columns[60];
                $order->delivery_target_name_family_name	=	$columns[61];
                $order->delivery_target_name_name	=	$columns[62];
                $order->delivery_target_name_kana_family_name	=	$columns[63];
                $order->delivery_target_name_kana_name	=	$columns[64];
                $order->birthdate	=	empty($columns[65])?null:Carbon::parse($columns[65])->format("Y-m-d");
                $order->sex	=	$columns[66];
                $order->zeus_order_number	=	$columns[67];
                $order->zeus_ip_code	=	$columns[68];
                $order->coupon_code	=	$columns[69];
                $order->fixed_term_order_date	=	empty($columns[70])?null:Carbon::parse($columns[70])->format("Y-m-d");
                $order->order_id	=	$columns[71];
                $order->gmo_order_number	=	$columns[72];
                $order->fixed_term_order_number	=	$columns[73];
                $order->manager_memo	=	$columns[74];
                $order->guest_representative	=	$columns[75];
                $order->guest_to_communicating_field_fixed_term	=	$columns[76];
                $order->guest_from_communicating_field_fixed_term	=	$columns[77];
                $order->store_within_communicating_field_fixed_term	=	$columns[78];
                $order->administrator_memo_fixed_term	=	$columns[79];
                $order->np_trading_id	=	$columns[80];
                $order->np_franchised_store_id	=	$columns[81];
                $order->internal_tax_etc	=	empty($columns[82])?null:$columns[82];
                $order->fixed_term_delivery_cycle_2	=	$columns[83];
                $order->order_representative	=	$columns[84];
                $order->fixed_term_delivery_status	=	$columns[85];
                $order->pause_date	=	empty($columns[86])?null:Carbon::parse($columns[86])->format("Y-m-d");
                $order->tax_rate_kubun	=	$columns[87];
                $order->tax_rate	=	$columns[88];
                $order->amazonpay_reference_id	=	rtrim($columns[89],'"');
                $order->save();
            }
            DB::commit();
            return self::getOrders($delivery_due_date);
        } catch (\Exception $e){
            \Log::error($e);
            DB::rollBack();
            throw $e;
        }
    }
}

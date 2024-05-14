<?php
namespace App\Services;
use DateTime;
use DateTimeZone;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Orders{
    //DBで検索に使うため、Y-m-d H:i:sの形からタイムゾーンを考慮したY-m-dの形にします。
    /**
     * @throws Exception
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
    public static function getOrders(string $fromDate, string $toDate = null, $is_shipping_fixed = null): Collection
    {
        if(!$toDate){
            $toDate = $fromDate;
        }

        $query = DB::table('orders')
            ->whereBetween('delivery_due_date', [self::_getQueryDate($fromDate), self::_getQueryDate($toDate)]);


        if(!is_null($is_shipping_fixed)){
            $query->where('is_shipping_fixed', $is_shipping_fixed);
        }

        $query->orderByRaw("
                CASE
                    WHEN feces_type = '日本郵便（ポスト投函） ' THEN 1
                    WHEN feces_type = '佐川急便' THEN 2
                    WHEN feces_type = 'ヤマトメール便' THEN 3
                    WHEN feces_type = 'ヤマト宅急便' THEN 4
                    WHEN feces_type = '日本郵便（対面配達・手数料600円）' THEN 5
                    WHEN feces_type = '佐川急便（飛脚クール便）' THEN 6
                    WHEN feces_type = 'ヤマト宅急便（クール宅急便）' THEN 7
                    WHEN feces_type = '日本郵便（ポスト投函）（冷蔵・冷凍）' THEN 8
                    WHEN feces_type = '日本郵便（対面配達・手数料600円）（冷蔵・冷凍）' THEN 9
                    WHEN feces_type = 'ヤマト宅急便コンパクト' THEN 10
                    WHEN feces_type = 'ヤマトネコポス' THEN 11
                    WHEN feces_type = 'ヤマトクロネコDM便' THEN 12
                    ELSE 999
                END,
                CASE
                    WHEN payment_methods = 'NP(後払いwiz)' THEN 1
                    WHEN payment_methods = '代引き' THEN 2
                    WHEN payment_methods = 'クレジットカード' THEN 3
                    WHEN payment_methods = 'NP(後払い)' THEN 4
                    WHEN payment_methods = 'GMO後払い' THEN 5
                    WHEN payment_methods = '楽天ペイ（オンライン決済）' THEN 6
                    WHEN payment_methods = 'Amazon Pay' THEN 7
                    ELSE 999
                END,
                reception_number, -- 受付番号
                delivery_due_date, -- 発送予定日
                order_id -- 注文ID
            ");

        return  $query->get();
    }

    /**
     * @param string $target_date
     * @param array|null $delete_ids
     * @param bool|null $is_shipping_fixed
     * @return Collection
     * @throws Exception
     */
    public static function deleteOrder(string $target_date , array $delete_ids = null, bool $is_shipping_fixed = null): Collection
    {
        try{
            DB::beginTransaction();
            $query = DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date));
            if(!is_null($delete_ids)){
                $query->whereIn('id', $delete_ids);
            }
            if(!is_null($is_shipping_fixed)){
                $query->where('is_shipping_fixed', $is_shipping_fixed);
            }
            $query->delete();
            DB::commit();
            return DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->get();
        }catch (Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param array $ids
     * @return Collection
     * @throws Exception
     */
    public static function settleShipping(array $ids, string $target_date): Collection
    {
        try{
            DB::beginTransaction();
            DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->whereIn('id', $ids)->update(['is_shipping_fixed' => true]);
            DB::commit();
            return DB::table('orders')->where('delivery_due_date', self::_getQueryDate($target_date))->get();
        }catch (Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param int $targetYear
     * @param int $targetMonth
     * @param string|null $itemCode
     * @return array
     * @throws Exception
     */
    public static function getMonthlyReport(int $targetYear, int $targetMonth, string $itemCode = null): array
    {
        $yearMonth = $targetYear. '-' .sprintf('%02d', $targetMonth); // YYYY-mm
        $firstDate = date('Y-m-d', strtotime('first day of ' . $yearMonth));
        $lastDate = date('Y-m-d', strtotime('last day of ' . $yearMonth));
        $days = date('d', strtotime($lastDate));
        //その月の出荷データを商品だけで集計しアイテムマスタを作成
        $query =  DB::table('orders')->select(['item_code','product_name'])->groupBy(['item_code', 'product_name'])->orderBy('item_code')->whereBetween('delivery_due_date',[self::_getQueryDate($firstDate), self::_getQueryDate($lastDate)]);
        $item_masters = $query->get();
        $order_data = self::groupByItem($firstDate, $lastDate, $itemCode, true);//確定データのみの集計
        $grouped = [];
        foreach ($item_masters as $item){//item codeの配列
            $item_code = $item->item_code;
            $item_key = serialize($item);//グループ化する為にキー化するが、あとで取り出す為にシリアライズする
            $grouped[$item_key] = [];
            for ($d = 1; $d <= $days; $d++){//1～末日までの配列
                $ymd = $yearMonth . '-' . sprintf('%02d',$d);
                foreach ($order_data as $order){
                    if($order->item_code == $item_code && $order->delivery_due_date == $ymd){
                        $grouped[$item_key][$ymd]['count'] = $order->count;
                        $grouped[$item_key][$ymd]['subtotal'] = $order->subtotal;
                    }else{
                        if(!isset($grouped[$item_key][$ymd]['count'])){
                            $grouped[$item_key][$ymd]['count'] = 0;
                        }
                        if(!isset($grouped[$item_key][$ymd]['subtotal'])) {
                            $grouped[$item_key][$ymd]['subtotal'] = 0;
                        }
                    }
                }
            }
        }
        // JSで使いやすいKeyValueの形に修正
        $return = [];
        foreach ($grouped as $item_key => $daily_data){
            $item = unserialize($item_key);
            $daily_summary = [];
            foreach ($daily_data as $ymd => $data){
                $daily_summary[] = [
                        'day' => $ymd,
                        'count' => $data['count'],
                        'subtotal' => $data['subtotal']
                    ];
            }
            $return[] = [
                'item_code' => $item->item_code,
                'product_name' => $item->product_name,
                'daily_summary' => $daily_summary
            ];
        }
        return $return;
    }

    /**
     * @param string $fromDate
     * @param string $toDate
     * @param string|null $itemCode
     * @return Collection
     * @throws Exception
     */
    public static function groupByItem(string $fromDate, string $toDate, string $itemCode = null , $is_shipping_fixed = null): Collection
    {
        $query = DB::table('orders')
            ->selectRaw('delivery_due_date, item_code, product_name, sum(quantity) as quantity, sum(subtotal) as subtotal , count(item_code) as count')
            ->groupBy(['delivery_due_date', 'item_code', 'product_name'])
            ->orderByRaw('delivery_due_date, CONVERT(item_code, UNSIGNED INTEGER )')
            ->whereBetween('delivery_due_date',[self::_getQueryDate($fromDate), self::_getQueryDate($toDate)]);
        if($itemCode){
            $query->where('item_code', $itemCode);
        }
        if(!is_null($is_shipping_fixed)){
            $query->where('is_shipping_fixed', $is_shipping_fixed);
        }
        return $query->get();
    }

    /**
     * CSVの一行からOrderレコードを生成（カンマ区切り）
     * @param $csv_body
     * @return Collection
     * @throws Exception
     */
    public static function csv_row_to_order($csv_body): Collection
    {
        try {
            DB::beginTransaction();
            $delivery_due_date = "";
            foreach ($csv_body as $index => $row) {
                $columns = explode('","', $row);//文章の中にカンマがあるため
                $order = new \App\Models\Orders;
                if(count($columns) <= 1 ) continue;//最後のカンマが空の1行とみなされることがあるため
                $order->delivery_due_date	=	empty($columns[48])?null:Carbon::parse($columns[48])->format("Y-m-d");
                if($index===0){
                    $delivery_due_date = $order->delivery_due_date;
                    break;
                }
            }
            self::deleteOrder($delivery_due_date, null,false);
            foreach ($csv_body as $index => $row) {
                $columns = explode('","', $row);//文章の中にカンマがあるため
                $order = new \App\Models\Orders;
                if(count($columns) <= 1 ) continue;//最後のカンマが空の1行とみなされることがあるため
                $order->reception_date	=	empty($columns[0])?null: \Carbon\Carbon::parse(ltrim($columns[0],'"'))->format("Y-m-d");
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
                $order->delivery_due_date	=	empty($columns[48])?null:Carbon::parse($columns[48])->format("Y-m-d");
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
        } catch (Exception $e){
            \Log::error($e);
            throw $e;
        }
    }
}

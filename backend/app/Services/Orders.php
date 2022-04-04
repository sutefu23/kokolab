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
     * @param int $targetYear
     * @param int $targetMonth
     * @return array
     * @throws \Exception
     */
    public static function getMonthlyReport(int $targetYear, int $targetMonth): array
    {
        $yearMonth = $targetYear. '-' .sprintf('%02d', $targetMonth); // YYYY-mm
        $firstDate = date('Y-m-d', strtotime('first day of ' . $yearMonth));
        $lastDate = date('Y-m-d', strtotime('last day of ' . $yearMonth));
        $days = date('d', strtotime($lastDate));
        $item_masters =  DB::table('orders')->select(['item_code','product_name'])->groupBy(['item_code', 'product_name'])->orderBy('item_code')->whereBetween('delivery_due_date',[self::_getQueryDate($firstDate), self::_getQueryDate($lastDate)])->get();
        $group_data = self::groupByItem($firstDate, $lastDate);
        $return = [];
        foreach ($item_masters as $item){//item codeの配列
            $item_code = $item->item_code;
            $product_name = $item->product_name;
            $return[$product_name] = [];
            for ($d = 1; $d <= $days; $d++){//1～末日までの配列
                $ymd = $yearMonth . '-' . sprintf('%02d',$d);
                foreach ($group_data as $data){
                    if($data->item_code == $item_code && $data->delivery_due_date == $ymd){
                        $return[$product_name][$ymd]['count'] = $data->count;
                        $return[$product_name][$ymd]['subtotal'] = $data->subtotal;
                    }else{
                        if(!isset($return[$product_name][$ymd]['count'])){
                            $return[$product_name][$ymd]['count'] = 0;
                        }
                        if(!isset($return[$product_name][$ymd]['subtotal'])) {
                            $return[$product_name][$ymd]['subtotal'] = 0;
                        }
                    }
                }
            }
        }
        debug($return);
        return $return;
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
            ->selectRaw('delivery_due_date, item_code, product_name, sum(quantity) as quantity, sum(subtotal) as subtotal , count(item_code) as count')
            ->groupBy(['delivery_due_date', 'item_code', 'product_name'])
            ->orderByRaw('delivery_due_date, CONVERT(item_code, UNSIGNED INTEGER )')
            ->whereBetween('delivery_due_date',[self::_getQueryDate($fromDate), self::_getQueryDate($toDate)])
            ->get();
    }

    /**
     * CSVの一行からOrderレコードを生成（カンマ区切り）
     * @param $row
     * @return \App\Models\Orders
     * @throws \Exception
     */
    public static function csv_row_to_order($csv_body){
        try {
            $order = new \App\Models\Orders;
            return $order;
        } catch (\Exception $e){
            \Log::error($e);
            throw $e;
        }
    }
}

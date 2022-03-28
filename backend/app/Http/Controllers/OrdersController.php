<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Exports\PickingListExport;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Orders::all();
    }

    public function getColor(Request $request)
    {
        return \App\Models\ColorConfigs::all();
    }

    public function setColor(Request $request)
    {
        DB::beginTransaction();
        try {
            \App\Models\ColorConfigs::query()->delete();
            $requests = $request->getContent();
            $configs = json_decode($requests, true) ?? [];
            foreach ($configs as $conf){
                $color_config = new \App\Models\ColorConfigs;
                $color_config->item_code = $conf['item_code'];
                $color_config->color = $conf['color'];
                $color_config->save();
            }
            DB::commit();
            return \App\Models\ColorConfigs::all();
        } catch (\Exception $e){
            \Log::error($e);
            DB::rollBack();
            throw \Exception("色情報の更新に失敗しました。");
        } finally {
            $request->flash();
        }
    }

    public function groupByItem(Request $request)
    {
        return Orders::groupByItem();
    }

    public function upload(Request $request)
    {
        DB::beginTransaction();
        $data = mb_convert_encoding($request->getContent(), 'UTF-8', 'SJIS-win');
        $data = preg_replace("/\r\n|\r|\n/", "\n", $data);

        $csv = explode(PHP_EOL, $data);
        $csv_header = $csv[0];
        $csv_body = array_splice($csv, 1);
        try {
            \App\Models\Orders::query()->delete();

            foreach ($csv_body as $row) {
                $columns = explode('","', $row);//文章の中にカンマがあるため
                $order = new \App\Models\Orders;
                if(count($columns) <= 1 ) continue;//最後のカンマが空の1行とみなされることがあるため
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
            return Orders::all();
        } catch (\Exception $e){
            \Log::error($e);
            abort(400, '更新に失敗しました。');
            DB::rollBack();
        } finally {
            $request->flash();
        }

        function getOrders(Request $request){
            $requests = $request->getContent();
            Log::debug($requests);
            DB::table('orders')::where(['shipping_date' => $request->date]);
        }

        function deleteOrders(Request $request){
            $requests = $request->getContent();
            $delete_ids = $request->ids;
            Log::debug($requests);

            if(len($delete_ids) === 0) return null;

            try {
                Orders::whereIn(['id' => $delete_ids])->delete();
            } catch (\Exception $e){
                \Log::error($e);
                abort(400, '削除に失敗しました。');
                DB::rollBack();
            } finally {
                $request->flash();
            }
        }

    }
}

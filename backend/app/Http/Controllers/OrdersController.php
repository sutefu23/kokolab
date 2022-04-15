<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
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

    public function getOrders(Request $request){
        return \App\Services\Orders::getOrders($request['fromDate'], $request['toDate']);
    }

    public function deleteOrders(Request $request){
        $param = json_decode($request->getContent(), true);
        $delete_ids = $param['ids'];
        $target_date = $param['target_date'];

        try {
            return \App\Services\Orders::deleteOrder($target_date, $delete_ids);
        } catch (\Exception $e){
            \Log::error($e);
            abort(400, '削除に失敗しました。');
            DB::rollBack();
        } finally {
            $request->flash();
        }
    }

    public function groupByItem(Request $request): \Illuminate\Support\Collection
    {
        try {
            return \App\Services\Orders::groupByItem($request['fromDate'], $request['toDate']);
        } catch (\Exception $e) {
            throw \Exception("商品グループ情報の更新に失敗しました。");
        } finally {
            $request->flash();
        }
    }

    public function report(Request $request): array
    {
        return \App\Services\Orders::getMonthlyReport($request['targetYear'], $request['targetMonth'], $request['itemCode']);
    }

    public function settleShipping(Request $request){
        $param = json_decode($request->getContent(),true);
        try {
            $ids = $param['ids'];
            $target_date = $param['target_date'];
            return \App\Services\Orders::settleShipping($ids, $target_date);
        } catch (\Exception $e) {
            throw \Exception("商品グループ情報の更新に失敗しました。");
        } finally {
            $request->flash();
        }
    }

    public function upload(Request $request)
    {
        try{
            $data = mb_convert_encoding($request->getContent(), 'UTF-8', 'SJIS-win');
            $data = preg_replace("/\r\n|\r|\n/", "\n", $data);
            $csv = explode(PHP_EOL, $data);
            $csv_body = array_splice($csv, 1);
            return \App\Services\Orders::csv_row_to_order($csv_body);
        } catch (\Exception $e){
            \Log::error($e);
            abort(400, '更新に失敗しました。');
            DB::rollBack();
        } finally {
            $request->flash();
        }
    }

}

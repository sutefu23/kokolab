<?php

namespace App\Http\Controllers;

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
        $param = json_decode($request->getContent(),true);
        DB::beginTransaction();
        $data = mb_convert_encoding($param['csv'], 'UTF-8', 'SJIS-win');
        $data = preg_replace("/\r\n|\r|\n/", "\n", $data);

        $csv = explode(PHP_EOL, $data);
        $csv_body = array_splice($csv, 1);
        try {
            foreach ($csv_body as $row) {
                \App\Services\Orders::csv_row_to_order($row);
            }
            DB::commit();
            return \App\Services\Orders::getOrders($request['targetDate']);
        } catch (\Exception $e){
            \Log::error($e);
            abort(400, '更新に失敗しました。');
            DB::rollBack();
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
            return \App\Services\Orders::deleteOrder($delete_ids, $target_date);
        } catch (\Exception $e){
            \Log::error($e);
            abort(400, '削除に失敗しました。');
            DB::rollBack();
        } finally {
            $request->flash();
        }
    }
}

<?php

namespace App\Exports;

use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Excel;
use PhpOffice\PhpSpreadsheet;


class InvoiceExport
{
    private string $template_file = 'Exports/Template/invoice.xlsx';
    static $targetDate;

    public function __construct($targetDate)
    {
        self::$targetDate = $targetDate;
    }
    /**
     * @throws PhpSpreadsheet\Exception
     * @throws PhpSpreadsheet\Writer\Exception
     */
    public function download($filename)
    {
        $spreadsheet = PhpSpreadsheet\IOFactory::load(app_path($this->template_file));
        $collection = \App\Services\Orders::getOrders(self::$targetDate);
        $key_groups = $collection->keyBy('reception_number');
        foreach ($key_groups as $key_obj){
            $orders = $collection->where('reception_number', $key_obj->reception_number);
            $sheet = clone $spreadsheet->getSheetByName('テンプレート');

            //ヘッダー
            $sheet->setTitle($orders->first()->orderer_full_name . "様");//【注文者】氏名
            $sheet->getCell('A5')->setValue("〒". substr($orders->first()->orderer_postal_code ,0,3) . "-". substr($orders->first()->orderer_postal_code ,3)); //【注文者】郵便番号
            $sheet->getCell('A6')->setValue($orders->first()->orderer_prefectures . $orders->first()->orderer_city . $orders->first()->orderer_town_address . $orders->first()->orderer_building); // 【注文者】住所
            $sheet->getCell('A7')->setValue($orders->first()->orderer_full_name); //　氏名
            $sheet->getCell('E10')->setValue($orders->first()->reception_number); //　受注番号
            if($orders->first()->fixed_term_delivery_status === "停止（休止）"){
                $sheet->getCell('E11')->setValue(""); // 次回発送null
            }else{
                $sheet->getCell('E11')->setValue(Carbon::parse($orders->first()->next_delivery_expected_date)->format('Y年m月d日')); // 次回発送
            }
            $sheet->getCell('E12')->setValue($orders->first()->fixed_term_delivery_cycle); // お届け周期
            $sheet->getCell('N4')->setValue(Carbon::parse($orders->first()->delivery_due_date)->format('Y年m月d日')); // 発送日
            //明細
            $row = 22;
            $No = 1;
            $tax_sum['8%'] = 0;
            $tax_sum['10%'] = 0;
            $temp_total = 0;
            foreach ($orders as $order){
                $sheet->getCell('A' . $row)->setValue($No);//Ｎｏ
                $sheet->getCell('C' . $row)->setValue($order->item_code);//商品コード
                $sheet->getCell('E' . $row)->setValue($order->product_name);//商品
                $sheet->getCell('L' . $row)->setValue($order->quantity);//数量
                $sheet->getCell('N' . $row)->setValue($order->unit_price);//単価
                $sheet->getCell('P' . $row)->setValue($order->subtotal);//小計
                $temp_total = $temp_total + (int)$order->subtotal;
                $tax_sum[$order->tax_rate] = $tax_sum[$order->tax_rate] + $order->subtotal;//key = {8%, 10%}
                $row = $row + 2;
                $No ++;
            }

            // フッター
            $sheet->getCell('M36')->setValue($temp_total); // 合計
            $sheet->getCell('M37')->setValue($orders->first()->shipping_fee??0); // 送料
            $sheet->getCell('M38')->setValue($orders->first()->fee??0); // 手数料
            $sheet->getCell('M39')->setValue($orders->first()->discount??0); // 割引額
            $sheet->getCell('M40')->setValue($orders->first()->inclusive_sum); // 合計
            $sheet->getCell('M41')->setValue($orders->first()->internal_tax_etc); // 消費税

            $sheet->getCell('M42')->setValue($tax_sum['8%']); // 8% 税率対象合計
            $sheet->getCell('M43')->setValue($tax_sum['10%']); // 10% 税率対象合計

            $sheet->getCell('B46')->setValue($orders->first()->communication_field_to_guest); // お客様への通信欄

            $spreadsheet->addSheet($sheet);
        }
        $spreadsheet->removeSheetByIndex(0);//テンプレート削除
        $writer = PhpSpreadsheet\IOFactory::createWriter($spreadsheet, Excel::XLSX);
        $file_name='result_excel.xlsx';
        $writer->save(storage_path($file_name));
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. $filename );
        $writer->save("php://output");
        exit;
    }

}

<?php
namespace App\Exports\Sheets;

use App\Exports\Traits\KokolabStylize;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class PickingListSheet implements FromCollection, WithMapping, WithHeadings, WithTitle, WithEvents, ShouldAutoSize
{

    use KokolabStylize;

    static $targetDate;

    public function __construct($targetDate)
    {
        self::$targetDate = $targetDate;
    }

    public function headings(): array
    {
        return [
            '商品コード',
            '注文番号', // order_id
            '発送氏名',// delivery_target_name_family_name & delivery_target_name_name(定期回数)
            '定期回数',
            '請求書', // 支払い方法（NP(後払いwiz)）だと〇
            '顧客種別', // 顧客種別が新規客か既存客
            '商品名',
            '到着希望日',
            '支払い方法',
            '通信欄',
            '便種'
        ];
    }
    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        $orders = \App\Services\Orders::getOrders(self::$targetDate, self::$targetDate, false);
        $collections = [];
        foreach ($orders as $order){
            for ($q = 1; $q <= $order->quantity; $q++) { //個数が1個以上の場合は顧客名などを空欄にしたうえでその分列を追加する
                $row = [];
                $is_first_row = ($q===1);
                $row['item_code'] = $order->item_code;
                $row['order_id'] = $is_first_row?$order->order_id:"";
                $row['delivery_target_name_family_name'] = $is_first_row?$order->delivery_target_name_family_name:"";
                $row['delivery_target_name_name'] = $is_first_row?$order->delivery_target_name_name:"";
                $row['fixed_term_times'] = $is_first_row?$order->fixed_term_times:"";
                $row['payment_methods'] = $is_first_row?$order->payment_methods:"";
                $row['customer_type'] = $is_first_row?$order->customer_type:"";
                $row['product_name'] = $order->product_name;
                $row['delivery_specified_date'] = $is_first_row?$order->delivery_specified_date:"";
                $row['delivery_specified_time'] = $is_first_row?$order->delivery_specified_time:"";
                $row['communication_field_from_guest'] = $is_first_row?$order->communication_field_from_guest:"";
                $row['communication_field_in_store'] = $is_first_row?$order->communication_field_in_store:"";
                $row['feces_type'] = $is_first_row?$order->feces_type:"";
                $collections[] = (object)$row;
            }
        }
//        \Log::debug($orders);
        return new Collection($collections);
    }
    /**
     *
     * @return array
     * @var \App\Model\Orders $row
     */
    public function map($row): array
    {
        return [
            $row->item_code,
            $row->order_id,
            $row->delivery_target_name_family_name . $row->delivery_target_name_name,
            $row->fixed_term_times,
            $row->payment_methods === "NP(後払いwiz)" ? "〇":"",
            $row->customer_type,
            $row->product_name,
            $row->delivery_specified_date . " " .$row->delivery_specified_time,
            $row->payment_methods,
            $row->communication_field_from_guest . ($row->communication_field_from_guest?"\n":"") . $row->communication_field_in_store,
            $row->feces_type
        ];
    }
    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => [KokolabStylize::class, 'stylize']
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'ピッキングリスト';
    }
}

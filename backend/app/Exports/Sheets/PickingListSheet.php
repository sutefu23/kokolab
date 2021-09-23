<?php
namespace App\Exports\Sheets;

use App\Exports\Traits\KokolabStylize;
use App\Models\Orders;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
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
        ];
    }
    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return Orders::all();
    }
    /**
     *
     * @return array
     * @var Orders $row
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

<?php
namespace App\Exports\Sheets;

use App\Exports\Traits\KokolabStylize;
use App\Services\Orders;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class ItemGroupSheet implements FromCollection, WithHeadings, WithTitle, WithEvents, ShouldAutoSize
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
            '商品名',
            '出荷数',
        ];
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        try {
            return Orders::groupByItem(self::$targetDate, self::$targetDate);
        } catch (\Exception $e) {
        }
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
        return 'ピッキングリスト合計';
    }
}

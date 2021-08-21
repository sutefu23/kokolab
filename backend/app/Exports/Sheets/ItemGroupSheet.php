<?php
namespace App\Exports\Sheets;

use App\Exports\Traits\KokolabStylize;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class ItemGroupSheet implements FromCollection, WithHeadings, WithTitle, WithEvents, ShouldAutoSize
{
    use KokolabStylize;

    public function headings(): array
    {
        return [
            '商品コード',
            '商品名',
            '出荷数',
        ];
    }
    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return \App\Models\Orders::groupByItem();
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

<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\Exportable;


class PickingListExport implements WithMultipleSheets
{
    use Exportable;
    static $targetDate;

    public function __construct($targetDate)
    {
        self::$targetDate = $targetDate;
    }
    /**
     * @return array
     */
    public function sheets(): array
    {

        $sheets[] = new Sheets\PickingListSheet(self::$targetDate);
        $sheets[] = new Sheets\ItemGroupSheet(self::$targetDate);

        return $sheets;
    }



}

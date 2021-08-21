<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\Exportable;


class PickingListExport implements WithMultipleSheets
{
    use Exportable;

    /**
     * @return array
     */
    public function sheets(): array
    {

        $sheets[] = new Sheets\PickingListSheet();
        $sheets[] = new Sheets\ItemGroupSheet();

        return $sheets;
    }



}

<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\Exportable;


class InvoiceExport implements WithMultipleSheets
{
    use Exportable;

    /**
     * @return array
     */
    public function sheets(): array
    {

        $sheets[] = new Sheets\InvoiceSheet();
        $sheets[] = new Sheets\ItemGroupSheet();

        return $sheets;
    }



}

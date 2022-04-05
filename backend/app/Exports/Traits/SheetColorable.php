<?php
namespace App\Exports\Traits;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
trait SheetColorable
{
    /**
     * Set background color for 1 line.
     *
     * @param Worksheet $sheet WorkSheet
     *
     * @param int $row target row index 一列
     *
     * @param string $col col どこの行まで
     *
     * @param string $colorCode Hex color code
     *
     */
    public static function setRowBgColor(Worksheet &$sheet , int $row, string $col, string $colorCode)
    {
        $xls_coordinate = "A". $row .":" . $col . $row;
        $sheet->getStyle($xls_coordinate)->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB(str_replace("#","",$colorCode));
    }

}

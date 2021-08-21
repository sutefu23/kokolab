<?php
namespace App\Exports\Traits;

use PhpOffice\PhpSpreadsheet\Exception;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

trait SheetBorderable
{
    private static Worksheet $sheet;
    /**
     *
     * @param Worksheet $sheet WorkSheet
     *
     * @param int $end_row until this row index データの最終の列インデックス
     *
     * @param string $end_col col index　何列目まで(エクセルのアルファベット)
     *
     */
    public static function setDataRange(Worksheet &$sheet , int $end_row, string $end_col)
    {
        $xls_coordinate = "A0:" . $end_col. $end_row;

        $styleArray = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ];

        $sheet->getStyle($xls_coordinate)->applyFromArray($styleArray);
    }
}

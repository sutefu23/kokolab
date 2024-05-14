<?php
namespace App\Exports\Traits;

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Illuminate\Support\Facades\Log;
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
        $xls_coordinate = "A1:" . $end_col. $end_row;

        $styleArray = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ];
//        $xls_coordinate = "A1:E10";
        $sheet->getStyle($xls_coordinate)->applyFromArray($styleArray);

    }
    /**
     * @param Worksheet $sheet
     * @param int $row
     * @param string $col
     * @param string $colorCode
     * @return void
     */
    public static function setRowBorderColor(Worksheet &$sheet , int $row, string $col, string $colorCode)
    {
        $xls_coordinate = "A". $row .":" . $col . $row;
        $border_style= [
            'borders' =>  [
                'outline' =>  [
                    'borderStyle' => Border::BORDER_THICK,
                    'color' =>  ['argb' => str_replace("#","",$colorCode)]
                ]
            ]
        ];
        $sheet->getStyle($xls_coordinate)->applyFromArray($border_style);
    }
}

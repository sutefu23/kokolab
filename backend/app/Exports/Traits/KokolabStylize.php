<?php
namespace App\Exports\Traits;

use Maatwebsite\Excel\Events\AfterSheet;

trait KokolabStylize
{
    use SheetColorable;
    use SheetBorderable;


    /**
     * @param AfterSheet $event
     */
    public static function stylize(AfterSheet $event)
    {
        $sheet = $event->sheet->getDelegate();

        //データ範囲の指定
        $rowIndex = $sheet->getHighestRow();
        $column = $sheet->getHighestColumn();
        self::setDataRange($sheet,$rowIndex, $column);

        //ヘッダーの色
        self::setRowBgColor($sheet,1,$column,"#eeeeee");


        //背景色の変更
        $color_master = \App\Models\ColorConfigs::all()->toArray();
        for($row = 1; $row <= $rowIndex; $row++){
            // item codeによる色設定の復元
            $item_code = $sheet->getCell("A" . $row)->getValue();
            $found_index = array_search($item_code, array_column($color_master, 'item_code'));
            if($found_index !== false){
                $hex = $color_master[$found_index]['color'];
                self::setRowBgColor($sheet,$row,$column,$hex);
            }

            //便種による色設定
            $sender_name = $sheet->getCell('K'. $row)->getValue();
            if(strpos($sender_name,'ヤマト') !== false){
                self::setRowBorderColor($sheet,$row,$column,'#FFFF0000');
            }

        }
    }
}

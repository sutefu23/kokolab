<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @property string $item_code
 * @property string $color
 * **/
class ColorConfigs extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_code',
        'color',
    ];
    protected $visible = [
        'item_code',
        'color',
    ];
}

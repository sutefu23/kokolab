<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyOrderComminucationColumnType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->text('communication_field_from_guest')->change(); // お客様からの通信欄
            $table->text('communication_field_in_store')->change(); // 店舗内通信欄
            $table->text('communication_field_to_guest')->change(); // お客様への通信欄
            $table->text('guest_to_communicating_field_fixed_term')->change(); // お客様への通信欄（定期）
            $table->text('guest_from_communicating_field_fixed_term')->change(); // お客様からの通信欄（定期）
            $table->text('store_within_communicating_field_fixed_term')->change(); // 店舗内通信欄（定期）
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
        });
    }
}

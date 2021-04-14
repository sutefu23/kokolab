<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => env('DEFAULT_USER'),
            'email' => env('DEFAULT_MAIL'),
            'email_verified_at' => now(),
            'password' => bcrypt(env('DEFAULT_PASS')),
            'remember_token' => Str::random(10),
        ]);
    }
}

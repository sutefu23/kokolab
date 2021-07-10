<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', 'Auth\RegisterController@register')->name('register');

Route::post('/login', 'Auth\LoginController@login')->name('login');

Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/users/me', 'UserController@show')->name('me');

Route::get('/orders', 'OrdersController@index')->name('orders');

Route::post('/orders/upload', 'OrdersController@upload')->name('ordersUpload');

Route::get('/orders/color', 'OrdersController@getColor')->name('orderGetColor');

Route::post('/orders/color', 'OrdersController@setColor')->name('orderSetColor');

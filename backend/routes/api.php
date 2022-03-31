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

Route::get('/orders', 'OrdersController@getOrders')->name('orders'); // param fromDate, toDate

Route::get('/orders/group_by_item', 'OrdersController@groupByItem')->name('ordersGroupByItem');// param fromDate, toDate

Route::delete('/orders/delete', 'OrdersController@deleteOrders')->name('deleteOrders'); //param ids

Route::post('/orders/upload', 'OrdersController@upload')->name('ordersUpload');// param targetDate

Route::post('/orders/settle', 'OrdersController@settleShipping')->name('ordersSettle');// param ids, targetDate

Route::get('/orders/color', 'OrdersController@getColor')->name('orderGetColor');

Route::post('/orders/color', 'OrdersController@setColor')->name('orderSetColor');

Route::get('/orders/report', 'OrdersController@report')->name('orderMonthlyReport'); // param targetMonth targetYear

Route::get('/orders/download/pickingList', 'DownloadController@pickingList')->name('downloadPickingList'); // param targetDate

Route::get('/orders/download/invoice', 'DownloadController@invoice')->name('downloadInvoice'); // param targetDate


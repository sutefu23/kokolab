<?php

namespace App\Http\Controllers;

use Facade\FlareClient\Http\Exceptions\InvalidData;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return \App\Models\Orders::all();
    }

    public function upload(Request $request)
    {
        $request->flash();

        \App\Models\Orders::query()->delete();
        $orders = $request->all();
        foreach ($orders as $order) {
            \App\Models\Orders::insert($order);
        }
    }
}

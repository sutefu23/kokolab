<?php

namespace App\Http\Controllers;

use App\Exports\PickingListExport;
use App\Exports\InvoiceExport;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function pickingList(Request $request){
        return (new PickingListExport($request['targetDate']))->download('pickinglist'. date('YmdHis') .'.xlsx');
    }

    public  function invoice(Request  $request){
        return (new InvoiceExport($request['targetDate']))->download('invoice'. date('YmdHis') .'.xlsx');
    }
}

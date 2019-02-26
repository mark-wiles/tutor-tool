<?php

namespace App\Http\Controllers;

use App\Lesson;
use Illuminate\Http\Request;

class EarningsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $d1 = date('Y', time());
        $d2 = ('-01-01 00:00:00');
        $yearStart = strtotime($d1 . $d2);

        $week = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0], ['unix_time', '>', (time() + (60 * 60 * 24 * -7))]])
            ->sum('payment');

        $month = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0], ['unix_time', '>', (time() + (60 * 60 * 24 * -30))]])
        ->sum('payment');

        $year = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0], ['unix_time', '>', $yearStart]])
        ->sum('payment');
        
        $total = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0]])
            ->sum('payment');
        
        $earnings['week'] = $week;
        $earnings['month'] = $month;
        $earnings['year'] = $year;
        $earnings['total'] = $total;

        return($earnings);
    }
    
}

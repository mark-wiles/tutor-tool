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

    public function index($year)
    {
        // $currentYear = date('Y', time()); //get current year
        $selectedYear = $year;
        $yearStart = strtotime($selectedYear . '-01-01 00:00:00');
        $yearEnd = $selectedYear . '-12-31 23:59:59';
        $timeStrings = [];
        $monthlyEarnings = [];

        for ($i = 0; $i < 12; $i++) {
            $k = $i + 1;
            if ($i < 9) {
                $timeStrings[$i] = $selectedYear . '-0' . $k . '-01 00:00:00';
            } else {
                $timeStrings[$i] = $selectedYear . '-' . $k . '-01 00:00:00';
            }
        }

        $timeStrings[12] = $yearEnd;

        for ($j = 0; $j < 12; $j++) {
            $l = $j + 1;
             $monthly = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0],['unix_time', '<', strtotime($timeStrings[$l])], ['unix_time', '>=', strtotime($timeStrings[$j])]])
            ->sum('payment');
            $monthlyEarnings[$j] = $monthly;
        }

        $week = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0], ['unix_time', '>', (time() + (60 * 60 * 24 * -7))]])
            ->sum('payment');

        $month = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0], ['unix_time', '>', (time() + (60 * 60 * 24 * -30))]])
        ->sum('payment');

        $year = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0], ['unix_time', '>', $yearStart], ['unix_time', '<', strtotime($yearEnd)]])
        ->sum('payment');
        
        $total = Lesson::where([['user_id', '=', auth()->id()], ['payment', '>', 0]])
            ->sum('payment');
        
        $earnings['week'] = $week;
        $earnings['month'] = $month;
        $earnings['year'] = $year;
        $earnings['total'] = $total;
        $earnings['monthly'] = $monthlyEarnings;

        return($earnings);
    }
    
}

<?php

namespace App\Http\Controllers;

use App\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lessons = Lesson::where([['lessons.user_id', '=', auth()->id()], ['lessons.unix_time', '>=', time()]])
            ->join('students', 'lessons.student_id', '=', 'students.id')
            ->select('lessons.*', 'students.first_name', 'students.last_name')
            ->orderBy('start_time')->get();
        
        return($lessons);
    }

    public function submitted()
    {
        $lessons = Lesson::where([['lessons.user_id', '=', auth()->id()], ['lessons.unix_time', '<', time()], ['lessons.payment', '>', 0]])
            ->join('students', 'lessons.student_id', '=', 'students.id')
            ->select('lessons.*', 'students.first_name', 'students.last_name')
            ->orderBy('start_time')->get();
        
        return($lessons);
    }

    public function unsubmitted()
    {
        $lessons = Lesson::where([['lessons.user_id', '=', auth()->id()], ['lessons.unix_time', '<', time()], ['lessons.payment', '=', 0]])
            ->join('students', 'lessons.student_id', '=', 'students.id')
            ->select('lessons.*', 'students.first_name', 'students.last_name')
            ->orderBy('start_time')->get();
        
        return($lessons);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $attributes = $this->validateLesson();

		$attributes['user_id'] = auth()->id();

        $lesson = Lesson::create($attributes);
        
        return ($attributes);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lesson = Lesson::where(['lessons.id' => $id, 'lessons.user_id' => auth()->id()])
        ->join('students', 'lessons.student_id', '=', 'students.id')
        ->select('lessons.*', 'students.first_name', 'students.last_name')
        ->get();

        return($lesson);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function edit(Lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lesson $lesson)
    {
        //
    }

    public function validateLesson() {

        return request()->validate([

            'start_time' => ['required', 'date', 'max:255'],

            'end_time' => ['required', 'date', 'max:255'],

            'unix_time' => ['required'],

            'student_id' => ['required', 'integer'],

            'rate' => ['required', 'integer', 'min:1', 'max:1000'],

            'subject' => ['nullable', 'min:2', 'max:255'],

        ]);
    }
}

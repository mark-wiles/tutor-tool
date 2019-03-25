<?php

namespace App\Http\Controllers;

use App\Lesson;
use App\Address;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Get all future lessons for a particular user

    public function index()
    {
        $lessons = Lesson::where([
            
            ['lessons.user_id', '=', auth()->id()],
            
            ['lessons.unix_time', '>=', time()]])

            ->join('students', 'lessons.student_id', '=', 'students.id')

            ->select('lessons.*', 'students.first_name', 'students.last_name')

            ->orderBy('start_time')->get();
        
        return($lessons);
    }

    // get all submitted lessons for a particular user

    public function submitted()
    {
        $lessons = Lesson::where([

            ['lessons.user_id', '=', auth()->id()],
            
            ['lessons.unix_time', '<', time()],
            
            ['lessons.payment', '>', 0]])

            ->join('students', 'lessons.student_id', '=', 'students.id')

            ->select('lessons.*', 'students.first_name', 'students.last_name')

            ->orderBy('start_time', 'desc')->get();
        
        return($lessons);
    }

    // get all past lessons for a particular user that have not been submitted

    public function unsubmitted()
    {
        $lessons = Lesson::where([
            
            ['lessons.user_id', '=', auth()->id()],

            ['lessons.unix_time', '<', time()],

            ['lessons.payment', '=', 0]])

            ->join('students', 'lessons.student_id', '=', 'students.id')

            ->select('lessons.*', 'students.first_name', 'students.last_name')

            ->orderBy('start_time')->get();
        
        return($lessons);
    }

    // Store a new lesson in the database

    public function store(Request $request)
    {
        
        $attributes = $this->validateLesson();

		$attributes['user_id'] = auth()->id();

        $lesson = Lesson::create($attributes);
        
        return ($attributes);

    }

    // Show a specific lesson

    public function show($id)
    {
        $lesson = Lesson::where([
            
            'lessons.id' => $id,
            
            'lessons.user_id' => auth()->id()
            
            ])

            ->join('students', 'lessons.student_id', '=', 'students.id')

            ->select('lessons.*', 'students.first_name', 'students.last_name', 'students.email', 'students.phone')

            ->first();

        $addresses = Address::where(['student_id' => $lesson->student_id])
            ->select('addresses.id','addresses.venue')
            ->get();

        $lesson['addresses'] = $addresses;

        $location = Address::where(['id' => $lesson->location_id])->first();

        $lesson['location'] = $location;

        return($lesson);
    }

    // Update a specific lesson

    public function update(Request $request, Lesson $lesson)
    {

        $attributes = $this->validateLesson();

        $updatedLesson = Lesson::where([
            
            'id' => $lesson->id,
            
            'user_id' => auth()->id()
            
            ])
            
            ->update($attributes);
        
        return ($attributes);

    }

    // Delete a specific lesson

    public function destroy(Lesson $lesson)
    {
        $result = Lesson::where(['id' => $lesson->id, 'user_id' => auth()->id()])->delete();

        return($result);
    }
    
    // validate request

    public function validateLesson() {

        return request()->validate([

            'start_time' => ['required', 'date', 'max:255'],

            'end_time' => ['required', 'date', 'max:255'],

            'unix_time' => ['required'],

            'student_id' => ['required', 'integer'],

            'location_id' => ['nullable', 'integer'],

            'rate' => ['required', 'integer', 'min:1', 'max:1000'],

            'subject' => ['nullable', 'min:2', 'max:255'],

            'payment' => ['min:0', 'max:1000'],

        ]);
    }
}

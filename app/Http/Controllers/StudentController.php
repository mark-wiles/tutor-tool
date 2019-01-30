<?php

namespace App\Http\Controllers;

use App\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
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
        $students = Student::where(['user_id' => auth()->id()])->latest()->get();
        
        return($students);
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
        $attributes = $this->validateStudent();

		$attributes['user_id'] = auth()->id();

        $student = Student::create($attributes);
        
        return ($student);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show($student)
    {
        $student = Student::where(['id' => $student, 'user_id' => auth()->id()])->get();

        return($student);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        $attributes = $this->validateStudent();

        $updatedStudent = Student::where(['id' => $student->id, 'user_id' => auth()->id()])->update($attributes);
        
        return ($student->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        //
    }

    public function validateStudent() {

		return request()->validate([

			'first_name' => ['required', 'min:2', 'max:255'],

            'last_name' => ['nullable', 'min:1', 'max:255'],

            'rate' => ['nullable', 'integer', 'min:1', 'max:1000'],

            'phone' => ['nullable', 'min:7', 'max:25'],

            'email' => ['nullable', 'email', 'max:255'],

            'street' => ['nullable', 'max:255'],

            'city' => ['nullable', 'max:255'],

            'state' => ['nullable', 'min:2', 'max:2'],

            'zip' => ['nullable', 'min:5', 'max:255'],
        ]);
			
	}
}

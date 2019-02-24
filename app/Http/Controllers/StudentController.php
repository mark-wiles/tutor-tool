<?php

namespace App\Http\Controllers;

use App\Student;
use App\Note;
use App\Address;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Display a listing of active students.

    public function index()
    {
        $students = Student::where(['students.user_id' => auth()->id(), 'students.active' => true])
            ->with(['addresses' => function($query) {
                $query->get();
            }])
            ->get();
        
        return($students);
    }

    // Display a listing of inactive students

    public function inactive()
    {
        $students = Student::where(['students.user_id' => auth()->id(), 'students.active' => false])
            ->with(['addresses' => function($query) {
                $query->get();
            }])
            ->get();
        
        return($students);
    }

    // Store a newly created student

    public function store(Request $request)
    {
        $attributes = $this->validateStudent();

		$attributes['user_id'] = auth()->id();

        $student = Student::create($attributes);
        
        return ($student);
    }

    // Display a specific student

    public function show($student)
    {
        $id = $student;
        
        $user = auth()->id();

        $student = Student::where(['id' => $id, 'user_id' => $user])->first();

        $notes = Note::where(['notes.student_id' => $id, 'notes.user_id' => $user])->get();

        $addresses = Address::where(['addresses.student_id' => $id, 'addresses.user_id' => $user])->get();
        
        $student['notes'] = $notes;

        $student['addresses'] = $addresses;

        return($student);
    }

    // Update a specific student

    public function update(Request $request, Student $student)
    {
        $attributes = $this->validateStudent();

        $updatedStudent = Student::where(['id' => $student->id, 'user_id' => auth()->id()])->update($attributes);
        
        return ($student->id);
    }

    // Mark a specific student as inactive
    
    public function active(Request $request, Student $student)
    {
        $validatedData = $request->validate(['active' => 'required|boolean']);

        $updatedStudent = Student::where(['id' => $student->id, 'user_id' => auth()->id()])->update($validatedData);

        return($updatedStudent);
    }

    public function validateStudent() {

		return request()->validate([

			'first_name' => ['required', 'min:2', 'max:255'],

            'last_name' => ['nullable', 'min:1', 'max:255'],

            'rate' => ['nullable', 'integer', 'min:1', 'max:1000'],

            'phone' => ['nullable', 'min:7', 'max:25'],

            'email' => ['nullable', 'email', 'max:255'],

            'active' => ['boolean'],

        ]);
			
	}
}

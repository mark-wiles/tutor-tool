<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
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

	public function store(Request $request)
    {
        
        $attributes = $this->validateNote();

		$attributes['user_id'] = auth()->id();

        $note = Note::create($attributes);
        
        return ($note);

	}
	
	public function validateNote()
	{
		return request()->validate([

			'note' => ['required', 'min:1', 'max:255'],

            'student_id' => ['required'],
        ]);
	}
}
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

	public function store(Request $request)
    { 
        $attributes = $this->validateNote();

		$attributes['user_id'] = auth()->id();

        $note = Note::create($attributes);
        
        return ($note);
    }
    
    public function show(Note $note)
    {
        $result = Note::where(['id' => $note->id, 'user_id' => auth()->id()])->first();

        return($result);
    }

    public function update(Request $request, Note $note)
    {
        $attributes = $this->validateNote();

        $updatedNote = Note::where(['id' => $note->id, 'user_id' => auth()->id()])->update($attributes);
        
        return ($updatedNote);
    }

    public function destroy(Note $note)
    {   
        $result = Note::where(['id' => $note->id, 'user_id' => auth()->id()])->delete();

        return($result);
    }
	
	public function validateNote()
	{
		return request()->validate([

			'note' => ['required', 'min:1', 'max:255'],

            'student_id' => ['required'],
        ]);
	}
}
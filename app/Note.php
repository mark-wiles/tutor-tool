<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['note', 'student_id', 'user_id'];

	public function students()
	  {
		return $this->belongsTo(Student::class);
	  }
}

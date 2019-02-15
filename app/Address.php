<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['venue', 'street', 'city', 'state', 'zip', 'student_id', 'user_id'];

	public function students()
	  {
		return $this->belongsTo(Student::class);
	  }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = ['start_time', 'end_time', 'unix_time', 'rate', 'student_id', 'user_id', 'location_id', 'subject', 'payment'];

	public function user()

	  {

		return $this->belongsTo(User::class);

		}
		
}

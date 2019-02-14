<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
  protected $fillable = ['first_name', 'last_name', 'rate', 'street', 'city', 'state', 'zip', 'phone', 'email', 'user_id'];

	public function user()
	  {
		return $this->belongsTo(User::class);
		}
		
		public function notes()
	  {
		return $this->hasMany(Note::class);
	  }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
  protected $fillable = ['first_name', 'last_name', 'rate', 'phone', 'email', 'user_id', 'active'];

	public function user()
	  {
		return $this->belongsTo(User::class);
		}
		
		public function notes()
	  {
		return $this->hasMany(Note::class);
		}
		
		public function addresses()
	  {
		return $this->hasMany(Address::class);
	  }
}

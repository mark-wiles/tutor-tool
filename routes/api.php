<?php

use Illuminate\Http\Request;

Route::get('/address/{address}', 'AddressController@show');
Route::post('/address', 'AddressController@store');
Route::put('/address/{address}', 'AddressController@update');
Route::delete('/address/{address}', 'AddressController@destroy');

Route::get('/lessons', 'LessonController@index');
Route::get('/lesson/{id}', 'LessonController@show');
Route::get('/lessons/unsubmitted', 'LessonController@unsubmitted');
Route::get('/lessons/submitted', 'LessonController@submitted');
Route::post('/lesson', 'LessonController@store');
Route::put('/lesson/{lesson}', 'LessonController@update');

Route::post('/note', 'NoteController@store');

Route::get('/students', 'StudentController@index');
Route::get('/student/{id}', 'StudentController@show');
Route::post('/student', 'StudentController@store');
Route::put('/student/{student}', 'StudentController@update');
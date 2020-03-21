<?php

use Illuminate\Http\Request;

//address routes
Route::get('/address/{address}', 'AddressController@show');
Route::get('/addresses/{id}', 'AddressController@index');
Route::post('/address', 'AddressController@store');
Route::put('/address/{address}', 'AddressController@update');
Route::delete('/address/{address}', 'AddressController@destroy');

// earnings routes
Route::get('/earnings/{year}', 'EarningsController@index');

//lesson routes
Route::get('/lessons', 'LessonController@index');
Route::get('/lesson/{lesson}', 'LessonController@show');
Route::get('/lessons/unsubmitted', 'LessonController@unsubmitted');
Route::get('/lessons/submitted', 'LessonController@submitted');
Route::post('/lesson', 'LessonController@store');
Route::put('/lesson/{lesson}', 'LessonController@update');
Route::delete('/lesson/{lesson}', 'LessonController@destroy');

//note routes
Route::get('/note/{note}', 'NoteController@show');
Route::post('/note', 'NoteController@store');
Route::put('/note/{note}', 'NoteController@update');
Route::delete('/note/{note}', 'NoteController@destroy');

//student routes
Route::get('/students', 'StudentController@index');
Route::get('/students/inactive', 'StudentController@inactive');
Route::get('/student/{student}', 'StudentController@show');
Route::post('/student', 'StudentController@store');
Route::put('/student/{student}', 'StudentController@update');
Route::put('/student/active/{student}', 'StudentController@active');

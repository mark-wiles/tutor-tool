<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/students', 'StudentController@index');
Route::get('/student/{id}', 'StudentController@show');
Route::post('/student', 'StudentController@store');
Route::put('/student/{student}', 'StudentController@update');

Route::get('/lessons', 'LessonController@index');
Route::post('/lesson', 'LessonController@store');



Route::view('/{path?}', 'home');

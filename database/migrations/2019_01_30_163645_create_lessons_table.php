<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->unsignedBigInteger('unix_time');
            $table->unsignedInteger('rate');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('location_id')->nullable();
            $table->string('subject')->nullable();
            $table->Decimal('payment', 13, 2)->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }   

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}

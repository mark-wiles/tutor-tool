<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_can_create_user_from_factory()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $this->assertDatabaseHas('users', ['name' => $user->name]);
    }

    public function test_can_create_student_from_factory()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $student = factory('App\Student')->create([
            'user_id' => $user->id
        ]);

        $this->assertDatabaseHas('students', ['id' => $student->id]);
    }
}

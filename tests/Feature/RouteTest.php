<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RouteTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_get_root()
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $this->assertGuest($guard = null);
    }

    public function test_get_login()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);

        $this->assertGuest($guard = null);
    }

    public function test_get_register()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);

        $this->assertGuest($guard = null);
    }

    public function test_get_students()
    {
        $response = $this->get('api/students');

        $response->assertStatus(302);
    }

    public function test_get_students_inactive()
    {
        $response = $this->get('api/students/inactive');

        $response->assertStatus(302);
    }

    public function test_get_student()
    {
        $response = $this->get('api/student/1');

        $response->assertStatus(302);
    }
}

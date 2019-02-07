<?php

use Faker\Generator as Faker;

$factory->define(App\Lesson::class, function (Faker $faker) {
    return [
        'start_time' => $faker->dateTime('2018-01-30 18:00:00'),
        'end_time' => $faker->dateTime('2018-01-30 19:00:00'),
        'unix_time' => $faker->unixTime($max = 'now'),
        'rate' => $faker->numberBetween($min = 25, $max = 50),
        'student_id' => $faker->numberBetween($min = 1, $max = 10),
        'user_id' => 1,
        'subject' => 'Algebra 1',
    ];
});

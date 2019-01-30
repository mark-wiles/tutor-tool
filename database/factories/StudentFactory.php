<?php

use Faker\Generator as Faker;

$factory->define(App\Student::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'rate' => $faker->numberBetween($min = 25, $max = 50),
        'street' => $faker->streetAddress,
        'city' => $faker->city,
        'state' => $faker->stateAbbr,
        'zip' => $faker->postcode,
        'phone' => $faker->tollFreePhoneNumber,
        'email' => $faker->unique()->safeEmail,
        'user_id' => 1,
    ];
});

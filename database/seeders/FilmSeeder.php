<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Film;

class FilmSeeder extends Seeder
{
    public function run(): void
    {
        Film::create([
            'title' => 'Avengers',
            'description' => 'Superhero movie',
            'release_date' => '2012-05-04',
            'duration' => 143,
            'rating' => 'PG-13'
        ]);
    }
}

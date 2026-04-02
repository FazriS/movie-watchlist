<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('genres')->insert([
            ['name' => 'action'],
            ['name' => 'comedy'],
            ['name' => 'romance'],
            ['name' => 'drama'],
            ['name' => 'thriller'],
            ['name' => 'horror'],
            ['name' => 'sci-fi'],
            ['name' => 'animation'],
            ['name' => 'fantasy'],
            ['name' => 'documentary'],
        ]);
    }
}

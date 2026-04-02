<?php

namespace Database\Seeders;

use App\Models\Film;
use App\Models\User;
use App\Models\Watchlist;
use Illuminate\Database\Seeder;

class WatchlistSeeder extends Seeder
{
    /**
     * Jalankan database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $films = Film::all();

        $statuses = ['planned', 'watching', 'watched'];

        foreach ($users as $user) {
            // Ambil 3 film random per user, pastikan tidak error jika jumlah film < 3
            $randomFilms = $films->random(min(3, $films->count()));

            foreach ($randomFilms as $film) {
                Watchlist::firstOrCreate(
                    [
                        'user_id' => $user->id, 
                        'film_id' => $film->id
                    ],
                    [
                        'status'  => $statuses[array_rand($statuses)]
                    ]
                );
            }
        }
    }
}
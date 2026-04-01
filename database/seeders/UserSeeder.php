<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            $user = User::create([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@test.com',
            ]);

            Profile::create([
                'user_id' => $user->id,
                'bio' => 'Bio untuk User ' . $i,
            ]);
        }
    }
}
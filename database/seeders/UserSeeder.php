<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {

            // Role otomatis:
            // User 1 = admin
            // User 2 = manager
            // Sisanya = user

            $role = 'user';

            if ($i == 1) {
                $role = 'admin';
            } elseif ($i == 2) {
                $role = 'manager';
            }

            $user = User::create([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@test.com',
                'password' => Hash::make('password'),
                'role' => $role,
            ]);

            Profile::create([
                'user_id' => $user->id,
                'bio' => 'Bio untuk User ' . $i,
            ]);
        }
    }
}
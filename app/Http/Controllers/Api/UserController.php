<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {
        return User::with('profile')->get();
    }

    // GET /api/users/{id}
    public function show($id)
    {
        $user = User::with('profile')->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        return $user;
    }

    // POST /api/users
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'bio' => 'nullable'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        $profile = Profile::create([
            'user_id' => $user->id,
            'bio' => $request->bio
        ]);

        return response()->json([
            'message' => 'User created',
            'data' => $user->load('profile')
        ], 201);
    }
}
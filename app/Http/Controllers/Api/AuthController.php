<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Register a User.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role'     => 'required|in:admin,manager,user',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            // Jangan gunakan Hash::make() jika di Model User sudah ada cast 'hashed'
            'password' => $request->password, 
            'role'     => $request->role,
        ]);

        // Buat profile kosong otomatis saat register
        Profile::create([
            'user_id' => $user->id,
            'bio'     => 'Hello, I am new here!',
        ]);

        return response()->json([
            'message' => 'User berhasil didaftarkan',
            'user'    => $user,
        ], 201);
    }

    /**
     * Get a JWT via given credentials.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized: Email atau password salah'
            ], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'message' => 'User successfully signed out'
        ]);
    }

    /**
     * Get the authenticated User.
     */
    public function getUserProfile()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Get the token array structure.
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            // Default TTL jwt-auth adalah 60 menit
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'user'         => auth('api')->user(),
        ]);
    }
}
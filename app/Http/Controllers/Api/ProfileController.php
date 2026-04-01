<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;

class ProfileController extends Controller
{
    // GET /api/profiles/{id}
    public function show($id)
    {
        $profile = Profile::with('user')->find($id);

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found'
            ], 404);
        }

        return $profile;
    }
}
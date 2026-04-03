<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAuth
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-KEY');

        // mapping API key ke user_id
        $users = [
            'TISGOKIL' => 1,
            'USER2'    => 2,
        ];

        if (!$apiKey || !isset($users[$apiKey])) {
            return response()->json([
                'message' => 'Unauthorized - Invalid API Key'
            ], 401);
        }

        // 🔥 SET USER LOGIN SECARA MANUAL
        Auth::loginUsingId($users[$apiKey]);

        return $next($request);
    }
}
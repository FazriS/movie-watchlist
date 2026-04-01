<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UserAuth
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-KEY');

        // cek apakah header ada dan sesuai
        if (!$apiKey || $apiKey !== 'TISGOKIL') {
            return response()->json([
                'message' => 'Unauthorized - Invalid API Key'
            ], 401);
        }

        return $next($request);
    }
}
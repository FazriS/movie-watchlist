<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle($request, Closure $next, ...$roles)
    {
        if (!in_array($request->user()->role, $roles)) {
            return response()->json([
                'message' => 'Akses ditolak, role Anda tidak sesuai.'
            ], 403);
        }

        return $next($request);
    }
}
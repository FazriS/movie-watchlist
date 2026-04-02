<?php

namespace App\Http\Controllers\Api;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    /**
     * GET /api/watchlists
     * Menampilkan semua daftar watchlist milik user yang sedang login.
     */
    public function index()
    {
        $watchlists = Watchlist::with('film')
            ->where('user_id', Auth::id())
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $watchlists,
        ]);
    }

    /**
     * GET /api/watchlists/{id}
     * Menampilkan detail item watchlist tertentu.
     */
    public function show($id)
    {
        $watchlist = Watchlist::with('film')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => $watchlist,
        ]);
    }

    /**
     * POST /api/watchlists
     * Menambahkan film baru ke dalam watchlist.
     */
    public function store(Request $request)
    {
        $request->validate([
            'film_id' => 'required|exists:films,id',
            'status'  => 'required|in:planned,watching,watched',
        ]);

        // Cek apakah film sudah ada di watchlist user untuk menghindari duplikat
        $exists = Watchlist::where('user_id', Auth::id())
            ->where('film_id', $request->film_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Film sudah ada di watchlist kamu.',
            ], 409); // 409: Conflict
        }

        $watchlist = Watchlist::create([
            'user_id' => Auth::id(),
            'film_id' => $request->film_id,
            'status'  => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Film berhasil ditambahkan ke watchlist.',
            'data'    => $watchlist->load('film'),
        ], 201); // 201: Created
    }
}
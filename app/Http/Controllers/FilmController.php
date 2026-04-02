<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    // POST /api/films
    public function store(Request $request)
    {
        $film = Film::create($request->all());

        return response()->json($film, 201);
    }

    // GET /api/films
    public function index()
    {
        return Film::all();
    }

    // GET /api/films/{id}
    public function show($id)
    {
        return Film::findOrFail($id);
    }

    // GET /api/films/{id}/genres
    public function genres($id)
    {
        $film = Film::with('genres')->findOrFail($id);
        return response()->json($film->genres);
    }
}
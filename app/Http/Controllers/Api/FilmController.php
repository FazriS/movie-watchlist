<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index()
    {
        return Film::all();
    }

    public function show($id)
    {
        return Film::findOrFail($id);
    }

    public function store(Request $request)
    {
        $film = Film::create($request->all());
        return response()->json($film, 201);
    }

    public function genres($id)
    {
        $film = Film::with('genres')->findOrFail($id);
        return response()->json($film->genres);
    }
}

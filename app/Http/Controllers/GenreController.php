<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function createGenre(Request $request){
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $genre = Genre::create([
            'name' => $request->name
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Genre created successfully',
            'genre' => $genre
        ]);
    }

    public function getAllGenres(){
        $genres = Genre::all();
        return response()->json([
            'success' => true,
            'message' => 'Genres retrieved successfully',
            'genres' => $genres
        ]);
    }

    public function getGenreById($id){
        $genres = Genre::findOrFail($id);
        return response()->json([
            'success' => true,
            'message' => 'Showing genre with id ' . $id,
            'genres' => $genres
        ]);
    }
}

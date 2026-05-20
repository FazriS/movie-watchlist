<?php

namespace App\Http\Controllers;

use App\Models\Film;
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
        $genre = Genre::findOrFail($id);
        return response()->json([
            'success' => true,
            'message' => 'Showing genre with id ' . $id,
            'genres' => $genre
        ]);
    }

    // PUT /api/films/{id}/genre/{genreId}
    public function attachGenre($id, $genreId){
        $film = Film::findOrFail($id);
        $genre = Genre::findOrFail($genreId);

        // syncWithoutDetaching agar tidak duplicate, pakai attach jika ingin bisa duplikat
        $film->genres()->syncWithoutDetaching([$genreId]);

        return response()->json([
            'success' => true,
            'message' => "Genre '{$genre->name}' berhasil disematkan ke film '{$film->title}'",
            'film'    => $film->title,
            'genre'   => $genre->name,
        ]);
    }
}

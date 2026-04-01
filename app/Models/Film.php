<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = [
        'title',
        'description',
        'release_date',
        'duration',
        'rating'
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'film_genres');
    }
}                 

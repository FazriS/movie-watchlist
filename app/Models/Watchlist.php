<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi melalui mass assignment.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id', 
        'film_id', 
        'status'
    ];

    /**
     * Relasi ke User (Many-to-One)
     * Menghubungkan watchlist dengan user yang memilikinya.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Film (Many-to-One)
     * Menghubungkan watchlist dengan film yang ditambahkan.
     */
    public function film()
    {
        return $this->belongsTo(Film::class);
    }
}
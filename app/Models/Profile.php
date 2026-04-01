<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'bio'
    ];

    // Relasi: Profile milik 1 User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
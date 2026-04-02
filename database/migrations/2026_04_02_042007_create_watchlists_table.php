<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('watchlists', function (Blueprint $table) {
            $table->id();
            // Membuat foreign key yang terhubung ke tabel users dan films
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('film_id')->constrained()->onDelete('cascade');
            
            // Kolom status dengan enum
            $table->enum('status', ['planned', 'watching', 'watched'])->default('planned');
            
            $table->timestamps();

            // Mencegah duplikasi: satu user hanya boleh punya satu entry per film
            $table->unique(['user_id', 'film_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watchlists');
    }
};
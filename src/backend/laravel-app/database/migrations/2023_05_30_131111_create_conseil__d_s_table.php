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
        Schema::create('conseil__d_s', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('date_cd');
            $table->date('heure_debut_cd');
            $table->date('heure_fin_cd');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conseil__d_s');
    }
};

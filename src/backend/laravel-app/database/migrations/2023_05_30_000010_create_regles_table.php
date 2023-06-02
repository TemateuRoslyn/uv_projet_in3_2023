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
        Schema::create('regles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('libelle');
            $table->unsignedBigInteger('reglement_interieur_id');
            $table->foreign('reglement_interieur_id')->references('id')->on('reglement_interieurs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regles');
    }
};

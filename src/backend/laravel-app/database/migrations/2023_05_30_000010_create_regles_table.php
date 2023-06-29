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
            $table->string('libelle');
            $table->unsignedBigInteger('reglementInterieurId');
            $table->foreign('reglementInterieurId')->references('id')->on('reglement_interieurs')->onDelete('cascade');
            $table->timestamps();
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

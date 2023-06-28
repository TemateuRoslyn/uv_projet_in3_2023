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
        Schema::create('sanction_prevus', function (Blueprint $table) {
            $table->id();
            $table->string('libelle');
            $table->string('niveauGravite');
            $table->string('motif');
            $table->date('dureeValidite');
            $table->unsignedBigInteger('eleveId');
            $table->foreign('eleveId')->references('id')->on('eleves');
            $table->unsignedBigInteger('convocationId');
            $table->foreign('convocationId')->references('id')->on('convocations');
            $table->unsignedBigInteger('regleId');
            $table->foreign('regleId')->references('id')->on('regles');
            $table->unsignedBigInteger('fauteId');
            $table->foreign('fauteId')->references('id')->on('fautes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sanction_prevus');
    }
};

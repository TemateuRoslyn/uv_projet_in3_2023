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
            $table->timestamps();
            $table->string('libelle');
            $table->string('niveau_gravite');
            $table->string('motif');
            $table->date('duree_validite');
            $table->unsignedBigInteger('eleve_id');
            $table->foreign('eleve_id')->references('id')->on('eleves');
            $table->unsignedBigInteger('convocation_id');
            $table->foreign('convocation_id')->references('id')->on('convocations');
            $table->unsignedBigInteger('regle_id');
            $table->foreign('regle_id')->references('id')->on('regles');
            $table->unsignedBigInteger('faute_id');
            $table->foreign('faute_id')->references('id')->on('fautes');
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

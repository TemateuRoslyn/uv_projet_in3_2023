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
        Schema::create('fautes', function (Blueprint $table) {
            $table->id();
            $table->string('libelleFaute');
            $table->string('gravite');
            $table->unsignedBigInteger('eleve_id');
            $table->foreign('eleve_id')->references('id')->on('eleves');
            $table->unsignedBigInteger('regle_id');
            $table->foreign('regle_id')->references('id')->on('regles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fautes');
    }
};

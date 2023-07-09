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
        Schema::create('conseil_disciplines', function (Blueprint $table) {
            $table->id();
            $table->date('dateCd');
            $table->time('heureDebutCd');
            $table->time('heureFinCd');
            $table->string('status');
            $table->unsignedBigInteger('eleveId');
            $table->foreign('eleveId')->references('id')->on('eleves')->onDelete('cascade');
            $table->unsignedBigInteger('fauteId');
            $table->foreign('fauteId')->references('id')->on('fautes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conseil_disciplines');
    }
};

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
            $table->timestamps();
            $table->string('libelle');
            $table->string('gravite');
            $table->unsignedBigInteger('eleveId');
            $table->foreign('eleveId')->references('id')->on('eleves')->onDelete('cascade');
            $table->unsignedBigInteger('regleId');
            $table->foreign('regleId')->references('id')->on('regles')->onDelete('cascade');
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

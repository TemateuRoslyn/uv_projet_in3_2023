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
        Schema::create('avoir_membre_conseil_disciplines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idMembreConseil');
            $table->foreign('idMembreConseil')->references('id')->on('membre_conseils')->onDelete('cascade');
            $table->unsignedBigInteger('idConseilDiscipline');
            $table->foreign('idConseilDiscipline')->references('id')->on('conseil_disciplines')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avoir_membre_conseil_disciplines');
    }
};

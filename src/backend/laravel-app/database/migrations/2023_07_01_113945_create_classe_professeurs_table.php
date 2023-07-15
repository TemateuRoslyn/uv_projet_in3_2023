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
        Schema::create('classe_professeurs', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('classeId');
            $table->unsignedBigInteger('professeurId');

            $table->foreign('professeurId')->references('id')->on('professeurs')->onDelete('cascade');
            $table->foreign('classeId')->references('id')->on('classes')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classe_professeurs');
    }
};

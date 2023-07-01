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
            $table->unsignedBigInteger('professeurId');
            $table->foreign('professeurId')->references('id')->on('professeurs')->onDelete('cascade');
            $table->unsignedBigInteger('classeId');
            $table->foreign('classeId')->references('id')->on('classes')->onDelete('cascade');
            $table->primary(['professeurId','classeId']);
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

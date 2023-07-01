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
        Schema::create('cours_classes', function (Blueprint $table) {
            $table->unsignedBigInteger('courId');
            $table->foreign('courId')->references('id')->on('cours')->onDelete('cascade');
            $table->unsignedBigInteger('classeId');
            $table->foreign('classeId')->references('id')->on('classes')->onDelete('cascade');
            $table->primary(['courId','classeId']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours_classes');
    }
};

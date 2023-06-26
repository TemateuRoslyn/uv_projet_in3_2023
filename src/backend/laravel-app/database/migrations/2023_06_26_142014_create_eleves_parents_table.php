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
        Schema::create('eleves_parents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('eleveId');
            $table->foreign('eleveId')->references('id')->on('eleves')->onDelete('cascade');
            $table->unsignedBigInteger('parentId');
            $table->foreign('parentId')->references('id')->on('parents')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves_parents');
    }
};

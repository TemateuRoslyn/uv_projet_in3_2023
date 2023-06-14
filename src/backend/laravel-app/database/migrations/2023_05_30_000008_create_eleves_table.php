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
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->boolean('solvable');
            $table->boolean('redoublant');
            $table->string('firstName');
            $table->string('lastName');
            $table->date('dateDeNaissance');
            $table->string('lieuDeNaissance');
            $table->string('photo')->nullable();
            $table->string('sexe');
            $table->string('telephone')->nullable();

            $table->unsignedBigInteger('userId');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('classeId');
            $table->foreign('classeId')->references('id')->on('classes')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves');
    }
};

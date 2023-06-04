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
            $table->string('name');
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_de_naissance');
            $table->string('lieu_de_naissance');
            $table->string('photo')->nullable();
            $table->string('sexe');
            $table->string('telephone')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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

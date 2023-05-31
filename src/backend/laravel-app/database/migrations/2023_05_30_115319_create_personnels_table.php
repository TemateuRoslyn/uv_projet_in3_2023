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
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_de_naissance');
            $table->string('login');
            $table->string('mot_de_passe');
            $table->string('lieu_de_naissance');
            $table->string('photo');
            $table->string('email');
            $table->string('sexe');
            $table->string('telephone');
            $table->string('role');
            $table->string('fonction');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnels');
    }
};

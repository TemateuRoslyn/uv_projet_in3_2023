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
        Schema::create('professeurs', function (Blueprint $table) {
            $table->id();
            $table->string('statut');
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_nais');
            $table->string('login');
            $table->string('mot_de_passe');
            $table->string('lieu_nais');
            $table->string('photo');
            $table->string('email');
            $table->string('sexe');
            $table->string('tel');
            $table->string('role');
            $table->unsignedBigInteger('user_id');
            $table->foreign('cour_id')->references('id')->on('cours');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professeurs');
    }
};

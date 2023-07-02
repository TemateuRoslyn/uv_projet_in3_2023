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
        Schema::create('convocations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('libelle');
            $table->date('dateConvocation');
            $table->date('dateRdv');
            $table->string('statut');
            $table->unsignedBigInteger('personnelId');
            $table->foreign('personnelId')->references('id')->on('personnels');
            $table->unsignedBigInteger('eleveId');
            $table->foreign('eleveId')->references('id')->on('eleves');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convocations');
    }
};

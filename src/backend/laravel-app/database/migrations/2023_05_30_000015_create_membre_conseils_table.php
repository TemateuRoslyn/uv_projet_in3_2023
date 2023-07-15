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
        Schema::create('membre_conseils', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('idChef');
            $table->unsignedBigInteger('idSurveillantG');
            $table->unsignedBigInteger('idRepresentantE');

            $table->foreign('idChef')->references('id')->on('personnels');
            $table->foreign('idSurveillantG')->references('id')->on('personnels')->onDelete('cascade');
            $table->foreign('idRepresentantE')->references('id')->on('parents')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membre_conseils');
    }
};

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
            $table->foreign('id_chef')->references('id')->on('personnels');
            $table->foreign('id_surveillant_G')->references('id')->on('personnels');
            $table->foreign('id_representant_E')->references('id')->on('parents');
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

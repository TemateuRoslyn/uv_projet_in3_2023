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
            $table->integer("id_chef");
            $table->integer("id_surveillant_G");
            $table->integer("id_representant_E");
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

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
        Schema::create('avoir__conseil_d__membre_c_s', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('conseil_disciplines_id')->references('id')->on('conseil_disciplines');
            $table->foreignId('membre_conseil_id')->references('id')->on('membre_conseils');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avoir__conseil_d__membre_c_s');
    }
};

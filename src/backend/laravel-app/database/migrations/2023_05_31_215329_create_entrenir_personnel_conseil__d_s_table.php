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
        Schema::create('entrenir_personnel_conseil__d_s', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('personnel_id')->constrained();
            $table->foreignId('conseil__d_s_id')->constrained();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrenir_personnel_conseil__d_s');
    }
};

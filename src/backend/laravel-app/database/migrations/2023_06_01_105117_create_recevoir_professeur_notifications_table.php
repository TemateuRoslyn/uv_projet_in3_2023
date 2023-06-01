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
        Schema::create('recevoir_professeur_notifications', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('professeur_id');
            $table->foreign('professeur_id')->references('id')->on('professeurs');

            $table->unsignedBigInteger('notification_id');
            $table->foreign('notification_id')->references('id')->on('notifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recevoir_professeur_notifications');
    }
};

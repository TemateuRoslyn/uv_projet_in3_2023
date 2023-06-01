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
        Schema::create('envoi_notification_parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('notification_id')->references('id')->on('notifications');
            $table->foreignId('parent_id')->references('id')->on('parents');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('envoi_notification_parents');
    }
};

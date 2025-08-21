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
        Schema::dropIfExists('links');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->enum('name', ['GitHub', 'GitLab', 'LinkedIn']);
            $table->string('url');
            $table->string('svg');
            $table->timestamps();
        });
    }
};

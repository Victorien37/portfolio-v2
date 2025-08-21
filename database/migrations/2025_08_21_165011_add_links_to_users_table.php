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
        Schema::table('users', function (Blueprint $table) {
            $table->string('github')->nullable()->after('cv');
            $table->string('gitlab')->nullable()->after('github');
            $table->string('linkedin')->nullable()->after('gitlab');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('github');
            $table->dropColumn('gitlab');
            $table->dropColumn('linkedin');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->foreignId('skill_type_id')->after('name');
        });

        DB::statement('ALTER TABLE skills DROP COLUMN `type`');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->dropForeign('skill_type_id');
            $table->dropColumn('skill_type_id');
            $table->enum('type', ['Backend', 'Frontend', 'Database']);
        });
    }
};

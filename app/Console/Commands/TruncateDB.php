<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TruncateDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:truncate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Trucate all tables';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        foreach (DB::select('SHOW TABLES') as $table) {
            $tableName = array_values((array)$table)[0];
            if (!in_array($tableName, ['cache', 'cache_locks', 'failed_jobs', 'job_batches', 'jobs', 'migrations', 'sessions'])) {
                DB::table($tableName)->truncate();
                $this->line("Table vidée : {$tableName}");
            }
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->info('Toutes les tables ont été vidées 🚀');
    }
}

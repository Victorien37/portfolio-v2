<?php

namespace App\Jobs;

use App\Services\TranslationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TranslateModelFieldsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 120;
    public int $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Model $model,
        public array $fields
    ) {}

    /**
     * Execute the job.
     */
    public function handle(TranslationService $translator): void
    {
        $updates = [];

        foreach ($this->fields as $field) {
            $originalValue = $this->model->getAttribute($field);

            if (is_string($originalValue)) {
                $updates[$field] = $translator->translate($originalValue);
            }
        }

        if (!empty($updates)) {
            $this->model->update($updates);
        }
    }
}

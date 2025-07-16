<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConfigResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'job'               => $this->getTranslation('job', 'fr'),
            'description'       => $this->getTranslation('description', 'fr'),
            'dark_background'   => $this->dark_background,
            'dark_primary'      => $this->dark_primary,
            'dark_secondary'    => $this->dark_secondary,
            'light_background'  => $this->light_background,
            'light_primary'     => $this->light_primary,
            'light_secondary'   => $this->light_secondary,
        ];
    }
}
